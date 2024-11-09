// Función auxiliar para formatear el texto
export const formatText = (text: string) => text.replace(/_/g, " ");

// Función recursiva para verificar si un valor tiene submenús
export const hasSubMenus = (value: any) =>
  typeof value === "object" && value !== null;
