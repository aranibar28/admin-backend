const getMenuFrontend = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Principal",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Dashboard", url: "/" },
        { title: "Progress", url: "progress" },
        { title: "Gráficas", url: "graphics" },
        { title: "Promesas", url: "promises" },
        { title: "Rxjs", url: "rxjs" },
      ],
    },
    {
      title: "Mantenimiento",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { title: "Usuarios", url: "usuarios" },
        { title: "Médicos", url: "medicos" },
        { title: "Hospitales", url: "hospitales" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Usuarios", url: "usuarios" });
  }

  return menu;
};

module.exports = { getMenuFrontend };
