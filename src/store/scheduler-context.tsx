"use client";

import {
  createContext,
  use,
  useReducer,
  useMemo,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import { defaultCarts } from "@/data/carts";
import { courses as allCourses } from "@/data/courses";
import {
  CalendarBlock,
  Cart,
  CartItem,
  ClassType,
  DayOfWeek,
  EnrollmentStatus,
  Semester,
} from "@/types";
import {
  assignConflictLayout,
  buildCalendarBlocks,
  getNextColor,
  timeSlotsOverlap,
} from "@/lib/utils";

interface SchedulerState {
  selectedCourseId: string | null;
  carts: Cart[];
  activeCartId: string;
  searchQuery: string;
  filters: {
    semesters: Semester[];
    enrollmentStatuses: EnrollmentStatus[];
    classTypes: ClassType[];
    days: DayOfWeek[];
    startTime: string;
    endTime: string;
    fitsSchedule: boolean;
    hasOpenSeats: boolean;
    countsTowardsDegree: boolean;
    requiredForMajor: boolean;
    minProfRating: number;
  };
}

type Action =
  | { type: "SELECT_COURSE"; courseId: string }
  | { type: "CLEAR_SELECTION" }
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; courseId: string; sectionId: string }
  | { type: "TOGGLE_CART_ITEM"; courseId: string; sectionId: string }
  | { type: "SWITCH_CART"; cartId: string }
  | { type: "CREATE_CART"; name: string }
  | { type: "DELETE_CART"; cartId: string }
  | { type: "RENAME_CART"; cartId: string; name: string }
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "TOGGLE_SEMESTER_FILTER"; semester: Semester }
  | { type: "TOGGLE_ENROLLMENT_FILTER"; status: EnrollmentStatus }
  | { type: "SET_FILTERS"; filters: SchedulerState["filters"] }
  | { type: "CLEAR_FILTERS" };

const DEFAULT_FILTERS: SchedulerState["filters"] = {
  semesters: [],
  enrollmentStatuses: [],
  classTypes: [],
  days: [],
  startTime: "",
  endTime: "",
  fitsSchedule: false,
  hasOpenSeats: false,
  countsTowardsDegree: false,
  requiredForMajor: false,
  minProfRating: 0,
};

const initialState: SchedulerState = {
  selectedCourseId: null,
  carts: defaultCarts,
  activeCartId: defaultCarts[0].id,
  searchQuery: "",
  filters: { ...DEFAULT_FILTERS },
};

function reducer(state: SchedulerState, action: Action): SchedulerState {
  switch (action.type) {
    case "SELECT_COURSE":
      return { ...state, selectedCourseId: action.courseId };

    case "CLEAR_SELECTION":
      return { ...state, selectedCourseId: null };

    case "ADD_TO_CART": {
      return {
        ...state,
        carts: state.carts.map((cart) => {
          if (cart.id !== state.activeCartId) return cart;
          const existing = cart.items.findIndex(
            (i) =>
              i.courseId === action.item.courseId &&
              i.sectionId === action.item.sectionId
          );
          if (existing !== -1) {
            const updated = [...cart.items];
            updated[existing] = {
              ...updated[existing],
              tutorialId: action.item.tutorialId,
            };
            return { ...cart, items: updated };
          }
          return { ...cart, items: [...cart.items, action.item] };
        }),
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === state.activeCartId
            ? {
                ...cart,
                items: cart.items.filter(
                  (i) =>
                    !(
                      i.courseId === action.courseId &&
                      i.sectionId === action.sectionId
                    )
                ),
              }
            : cart
        ),
      };
    }

    case "TOGGLE_CART_ITEM": {
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === state.activeCartId
            ? {
                ...cart,
                items: cart.items.map((i) =>
                  i.courseId === action.courseId &&
                  i.sectionId === action.sectionId
                    ? { ...i, selected: !i.selected }
                    : i
                ),
              }
            : cart
        ),
      };
    }

    case "SWITCH_CART":
      return { ...state, activeCartId: action.cartId };

    case "CREATE_CART": {
      const newCart: Cart = {
        id: `cart-${Date.now()}`,
        name: action.name,
        items: [],
      };
      return {
        ...state,
        carts: [...state.carts, newCart],
        activeCartId: newCart.id,
      };
    }

    case "DELETE_CART": {
      if (state.carts.length <= 1) return state;
      const remaining = state.carts.filter((c) => c.id !== action.cartId);
      return {
        ...state,
        carts: remaining,
        activeCartId:
          state.activeCartId === action.cartId
            ? remaining[0].id
            : state.activeCartId,
      };
    }

    case "RENAME_CART": {
      return {
        ...state,
        carts: state.carts.map((c) =>
          c.id === action.cartId ? { ...c, name: action.name } : c
        ),
      };
    }

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query };

    case "TOGGLE_SEMESTER_FILTER": {
      const semesters = state.filters.semesters.includes(action.semester)
        ? state.filters.semesters.filter((s) => s !== action.semester)
        : [...state.filters.semesters, action.semester];
      return { ...state, filters: { ...state.filters, semesters } };
    }

    case "TOGGLE_ENROLLMENT_FILTER": {
      const enrollmentStatuses = state.filters.enrollmentStatuses.includes(
        action.status
      )
        ? state.filters.enrollmentStatuses.filter((s) => s !== action.status)
        : [...state.filters.enrollmentStatuses, action.status];
      return { ...state, filters: { ...state.filters, enrollmentStatuses } };
    }

    case "SET_FILTERS":
      return { ...state, filters: action.filters };

    case "CLEAR_FILTERS":
      return { ...state, filters: { ...DEFAULT_FILTERS } };

    default:
      return state;
  }
}

interface ConflictInfo {
  courseId: string;
  sectionId: string;
  conflictsWith: string[];
}

interface SchedulerContextValue {
  state: SchedulerState;
  activeCart: Cart;
  calendarBlocks: CalendarBlock[];
  conflicts: ConflictInfo[];
  isCheckoutMode: boolean;
  isSuccessMode: boolean;
  getEffectiveEnrollmentStatus: (courseId: string) => EnrollmentStatus;
  enterCheckout: () => void;
  exitCheckout: () => void;
  confirmEnrollment: () => void;
  dismissSuccess: () => void;
  selectCourse: (courseId: string) => void;
  clearSelection: () => void;
  addToCart: (courseId: string, sectionId: string, tutorialId?: string) => void;
  removeFromCart: (courseId: string, sectionId: string) => void;
  toggleCartItem: (courseId: string, sectionId: string) => void;
  switchCart: (cartId: string) => void;
  createCart: (name: string) => void;
  deleteCart: (cartId: string) => void;
  renameCart: (cartId: string, name: string) => void;
  setSearchQuery: (query: string) => void;
  toggleSemesterFilter: (semester: Semester) => void;
  toggleEnrollmentFilter: (status: EnrollmentStatus) => void;
  setFilters: (filters: SchedulerState["filters"]) => void;
  clearFilters: () => void;
}

const SchedulerContext = createContext<SchedulerContextValue | null>(null);

export function SchedulerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isSuccessMode, setIsSuccessMode] = useState(false);
  const [enrollmentOverrides, setEnrollmentOverrides] = useState<
    Map<string, EnrollmentStatus>
  >(new Map());
  const enterCheckout = useCallback(() => setIsCheckoutMode(true), []);
  const exitCheckout = useCallback(() => setIsCheckoutMode(false), []);
  const dismissSuccess = useCallback(() => {
    setIsSuccessMode(false);
    setIsCheckoutMode(false);
    setEnrollmentOverrides(new Map());
  }, []);
  const getEffectiveEnrollmentStatus = useCallback(
    (courseId: string): EnrollmentStatus => {
      const override = enrollmentOverrides.get(courseId);
      if (override) return override;
      const course = allCourses.find((c) => c.id === courseId);
      return course?.enrollmentStatus ?? EnrollmentStatus.NOT_ENROLLED;
    },
    [enrollmentOverrides]
  );

  const activeCart = useMemo(
    () => state.carts.find((c) => c.id === state.activeCartId) ?? state.carts[0],
    [state.carts, state.activeCartId]
  );

  const calendarBlocks = useMemo(() => {
    const raw = buildCalendarBlocks(activeCart.items, allCourses);
    return assignConflictLayout(raw);
  }, [activeCart.items]);

  const conflicts = useMemo(() => {
    const result: ConflictInfo[] = [];
    const items = activeCart.items;

    for (let i = 0; i < items.length; i++) {
      const courseA = allCourses.find((c) => c.id === items[i].courseId);
      const sectionA = courseA?.sections.find(
        (s) => s.id === items[i].sectionId
      );
      if (!courseA || !sectionA) continue;

      const tutorialA = items[i].tutorialId
        ? sectionA.tutorials.find((t) => t.id === items[i].tutorialId)
        : null;
      const slotsA = [sectionA.timeSlot, ...(tutorialA ? [tutorialA.timeSlot] : [])];

      const conflictsWith: string[] = [];

      for (let j = 0; j < items.length; j++) {
        if (i === j) continue;
        const courseB = allCourses.find((c) => c.id === items[j].courseId);
        const sectionB = courseB?.sections.find(
          (s) => s.id === items[j].sectionId
        );
        if (!courseB || !sectionB) continue;

        const tutorialB = items[j].tutorialId
          ? sectionB.tutorials.find((t) => t.id === items[j].tutorialId)
          : null;
        const slotsB = [sectionB.timeSlot, ...(tutorialB ? [tutorialB.timeSlot] : [])];

        const hasOverlap = slotsA.some((a) => slotsB.some((b) => timeSlotsOverlap(a, b)));
        if (hasOverlap) {
          conflictsWith.push(courseB.code);
        }
      }

      if (conflictsWith.length > 0) {
        result.push({
          courseId: items[i].courseId,
          sectionId: items[i].sectionId,
          conflictsWith,
        });
      }
    }

    return result;
  }, [activeCart.items]);

  const confirmEnrollment = useCallback(() => {
    setIsSuccessMode(true);
    setEnrollmentOverrides((prev) => {
      const next = new Map(prev);
      for (const item of activeCart.items) {
        const course = allCourses.find((c) => c.id === item.courseId);
        const section = course?.sections.find((s) => s.id === item.sectionId);
        if (!course || !section) continue;

        const unmetPrereqs = course.prerequisites.some(
          (g) => !g.options.some((o) => o.met)
        );
        const hasConflict = conflicts.some(
          (c) => c.courseId === item.courseId && c.sectionId === item.sectionId
        );
        const isFull = section.enrolled >= section.capacity;

        if (unmetPrereqs || hasConflict) continue;
        if (isFull) {
          next.set(course.id, EnrollmentStatus.WAITLISTED);
        } else {
          next.set(course.id, EnrollmentStatus.ENROLLED);
        }
      }
      return next;
    });
  }, [activeCart.items, conflicts]);

  const selectCourse = useCallback(
    (courseId: string) => dispatch({ type: "SELECT_COURSE", courseId }),
    []
  );
  const clearSelection = useCallback(
    () => dispatch({ type: "CLEAR_SELECTION" }),
    []
  );
  const addToCart = useCallback(
    (courseId: string, sectionId: string, tutorialId?: string) => {
      const usedColors = activeCart.items.map((i) => i.color);
      const color = getNextColor(usedColors);
      dispatch({
        type: "ADD_TO_CART",
        item: { courseId, sectionId, tutorialId, color, selected: true },
      });
    },
    [activeCart.items]
  );
  const removeFromCart = useCallback(
    (courseId: string, sectionId: string) =>
      dispatch({ type: "REMOVE_FROM_CART", courseId, sectionId }),
    []
  );
  const toggleCartItem = useCallback(
    (courseId: string, sectionId: string) =>
      dispatch({ type: "TOGGLE_CART_ITEM", courseId, sectionId }),
    []
  );
  const switchCart = useCallback(
    (cartId: string) => dispatch({ type: "SWITCH_CART", cartId }),
    []
  );
  const createCart = useCallback(
    (name: string) => dispatch({ type: "CREATE_CART", name }),
    []
  );
  const deleteCart = useCallback(
    (cartId: string) => dispatch({ type: "DELETE_CART", cartId }),
    []
  );
  const renameCart = useCallback(
    (cartId: string, name: string) =>
      dispatch({ type: "RENAME_CART", cartId, name }),
    []
  );
  const setSearchQuery = useCallback(
    (query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }),
    []
  );
  const toggleSemesterFilter = useCallback(
    (semester: Semester) =>
      dispatch({ type: "TOGGLE_SEMESTER_FILTER", semester }),
    []
  );
  const toggleEnrollmentFilter = useCallback(
    (status: EnrollmentStatus) =>
      dispatch({ type: "TOGGLE_ENROLLMENT_FILTER", status }),
    []
  );
  const setFilters = useCallback(
    (filters: SchedulerState["filters"]) =>
      dispatch({ type: "SET_FILTERS", filters }),
    []
  );
  const clearFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    []
  );

  const value = useMemo<SchedulerContextValue>(
    () => ({
      state,
      activeCart,
      calendarBlocks,
      conflicts,
      isCheckoutMode,
      isSuccessMode,
      getEffectiveEnrollmentStatus,
      enterCheckout,
      exitCheckout,
      confirmEnrollment,
      dismissSuccess,
      selectCourse,
      clearSelection,
      addToCart,
      removeFromCart,
      toggleCartItem,
      switchCart,
      createCart,
      deleteCart,
      renameCart,
      setSearchQuery,
      toggleSemesterFilter,
      toggleEnrollmentFilter,
      setFilters,
      clearFilters,
    }),
    [
      state,
      activeCart,
      calendarBlocks,
      conflicts,
      isCheckoutMode,
      isSuccessMode,
      getEffectiveEnrollmentStatus,
      enterCheckout,
      exitCheckout,
      confirmEnrollment,
      dismissSuccess,
      selectCourse,
      clearSelection,
      addToCart,
      removeFromCart,
      toggleCartItem,
      switchCart,
      createCart,
      deleteCart,
      renameCart,
      setSearchQuery,
      toggleSemesterFilter,
      toggleEnrollmentFilter,
      setFilters,
      clearFilters,
    ]
  );

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
}

export function useScheduler() {
  const ctx = use(SchedulerContext);
  if (!ctx) throw new Error("useScheduler must be used within SchedulerProvider");
  return ctx;
}
