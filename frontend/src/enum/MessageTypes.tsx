export const type = {
    warning: "warning",
    error: "error",
    success: "success",
  } as const;
  
  export type MessageType = typeof type[keyof typeof type];