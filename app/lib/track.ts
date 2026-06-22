declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const YM_ID = 109992381;

export function track(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.ym?.(YM_ID, "reachGoal", goal, params);
    window.clarity?.("event", goal);
  } catch {
    // no-op
  }
}
