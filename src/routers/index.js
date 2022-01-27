class Router {
  constructor({ isNeedAuth, name, path, child = null }) {
    this.path = path;
    this.name = name;
    this.isNeedAuth = isNeedAuth;
    this.child = child;
  }
}

const routers = [
  new Router({
    isNeedAuth: false,
    name: "Home",
    path: "/home"
  }),
  new Router({
    isNeedAuth: false,
    name: "Product",
    path: "/product"
  }),
  new Router({
    isNeedAuth: true,
    name: "Reports",
    path: "/reports",
    child: [
      new Router({
        isNeedAuth: true,
        name: "Reports MKT",
        path: "/reports/mkt"
      }),
      new Router({
        isNeedAuth: true,
        name: "Reports B2B",
        path: "/reports/b2b",
        child: [
          new Router({
            isNeedAuth: true,
            name: "Reports B2B Domestic",
            path: "/reports/b2b/domestic"
          }),
          new Router({
            isNeedAuth: true,
            name: "Reports B2B Foreign",
            path: "/reports/b2b/foreign",
            child: [
              new Router({
                isNeedAuth: true,
                name: "Reports B2B Foreign EN",
                path: "/reports/b2b/foreign/en"
              }),
              new Router({
                isNeedAuth: true,
                name: "Reports B2B Foreign JP",
                path: "/reports/b2b/foreign/jp"
              }),
              new Router({
                isNeedAuth: true,
                name: "Reports B2B Foreign TH",
                path: "/reports/b2b/foreign/th"
              })
            ]
          })
        ]
      }),
      new Router({
        isNeedAuth: true,
        name: "Reports B2C",
        path: "/reports/b2c"
      })
    ]
  }),
  new Router({
    isNeedAuth: true,
    name: "Bill",
    path: "/bill"
  })
];
export default routers;
