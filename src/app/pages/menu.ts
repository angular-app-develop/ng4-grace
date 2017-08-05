export const MAIN_MENU = [{
  path: 'pages',
  children: [{
    path: 'home',
    data: {
      menu: {
        title: 'general.menu.home',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0
      }

    }
  },
  {
    path: 'monitor',
    data: {
      menu: {
        title: 'general.menu.monitor',
        icon: 'ion-eye',
        selected: false,
        expanded: false,
        order: 1
      }
    },
    children: [{
      path: 'alarm',
      data: {
        menu: {
          title: 'general.menu.alarm',
          icon: 'ion-ios-bell-outline',
          selected: false,
          expanded: false,
          order: 2
        }
      }
    },
    {
      path: 'device',
      data: {
        menu: {
          title: 'general.menu.device',
          icon: 'ion-ios-list-outline',
          selected: false,
          expanded: false,
          order: 3
        }
      }
    }

    ]
  },
  {
    path: 'workflow',
    data: {
      menu: {
        title: 'general.menu.workflow',
        icon: 'ion-network',
        selected: false,
        expanded: false,
        order: 100,
      }
    },
    children: [
      {
        path: 'workflowdesktop',
        data: {
          menu: {
            title: 'workflow.common.desktop',
            icon: 'ion-android-desktop'
          }
        }
      },
      {
        path: 'workflowusermanagement',
        data: {
          menu: {
            title: 'workflow.common.usermanagement',
            icon: 'ion-person-stalker'
          }
        }
      }

    ]
  },
    // {
    //   path: 'components',
    //   data: {
    //     menu: {
    //       title: 'general.menu.components',
    //       icon: 'ion-gear-a',
    //       selected: false,
    //       expanded: false,
    //       order: 250,
    //     }
    //   },
    //   children: [
    //     {
    //       path: 'treeview',
    //       data: {
    //         menu: {
    //           title: 'general.menu.tree_view',
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: 'charts',
    //   data: {
    //     menu: {
    //       title: 'general.menu.charts',
    //       icon: 'ion-stats-bars',
    //       selected: false,
    //       expanded: false,
    //       order: 200,
    //     }
    //   },
    //   children: [
    //     {
    //       path: 'chartist-js',
    //       data: {
    //         menu: {
    //           title: 'general.menu.chartist_js',
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: 'ui',
    //   data: {
    //     menu: {
    //       title: 'general.menu.ui_features',
    //       icon: 'ion-android-laptop',
    //       selected: false,
    //       expanded: false,
    //       order: 300,
    //     }
    //   },
    //   children: [
    //     {
    //       path: 'typography',
    //       data: {
    //         menu: {
    //           title: 'general.menu.typography',
    //         }
    //       }
    //     },
    //     {
    //       path: 'buttons',
    //       data: {
    //         menu: {
    //           title: 'general.menu.buttons',
    //         }
    //       }
    //     },
    //     {
    //       path: 'icons',
    //       data: {
    //         menu: {
    //           title: 'general.menu.icons',
    //         }
    //       }
    //     },
    //     {
    //       path: 'modals',
    //       data: {
    //         menu: {
    //           title: 'general.menu.modals',
    //         }
    //       }
    //     },
    //     {
    //       path: 'grid',
    //       data: {
    //         menu: {
    //           title: 'general.menu.grid',
    //         }
    //       }
    //     },
    //   ]
    // },
    // {
    //   path: 'forms',
    //   data: {
    //     menu: {
    //       title: 'general.menu.form_elements',
    //       icon: 'ion-compose',
    //       selected: false,
    //       expanded: false,
    //       order: 400,
    //     }
    //   },
    //   children: [
    //     {
    //       path: 'inputs',
    //       data: {
    //         menu: {
    //           title: 'general.menu.form_inputs',
    //         }
    //       }
    //     },
    //     {
    //       path: 'layouts',
    //       data: {
    //         menu: {
    //           title: 'general.menu.form_layouts',
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: 'tables',
    //   data: {
    //     menu: {
    //       title: 'general.menu.tables',
    //       icon: 'ion-grid',
    //       selected: false,
    //       expanded: false,
    //       order: 500,
    //     }
    //   },
    //   children: [
    //     {
    //       path: 'basictables',
    //       data: {
    //         menu: {
    //           title: 'general.menu.basic_tables',
    //         }
    //       }
    //     },
    //     {
    //       path: 'smarttables',
    //       data: {
    //         menu: {
    //           title: 'general.menu.smart_tables',
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: 'maps',
    //   data: {
    //     menu: {
    //       title: 'general.menu.maps',
    //       icon: 'ion-ios-location-outline',
    //       selected: false,
    //       expanded: false,
    //       order: 600,
    //     }
    //   },
    //   children: [
    //     {
    //       path: 'googlemaps',
    //       data: {
    //         menu: {
    //           title: 'general.menu.google_maps',
    //         }
    //       }
    //     },
    //     {
    //       path: 'leafletmaps',
    //       data: {
    //         menu: {
    //           title: 'general.menu.leaflet_maps',
    //         }
    //       }
    //     },
    //     {
    //       path: 'bubblemaps',
    //       data: {
    //         menu: {
    //           title: 'general.menu.bubble_maps',
    //         }
    //       }
    //     },
    //     {
    //       path: 'linemaps',
    //       data: {
    //         menu: {
    //           title: 'general.menu.line_maps',
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: '',
    //   data: {
    //     menu: {
    //       title: 'general.menu.pages',
    //       icon: 'ion-document',
    //       selected: false,
    //       expanded: false,
    //       order: 650,
    //     }
    //   },
    //   children: [
    //     {
    //       path: ['/login'],
    //       data: {
    //         menu: {
    //           title: 'general.menu.login'
    //         }
    //       }
    //     },
    //     {
    //       path: ['/register'],
    //       data: {
    //         menu: {
    //           title: 'general.menu.register'
    //         }
    //       }
    //     },
    //     {
    //       path: ['alarm'],
    //       data: {
    //         menu: {
    //           title: 'alarm'
    //         }
    //       }
    //     },
    //     {
    //       path: ['/about'],
    //       data: {
    //         menu: {
    //           title: 'about'
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: '',
    //   data: {
    //     menu: {
    //       title: 'general.menu.menu_level_1',
    //       icon: 'ion-ios-more',
    //       selected: false,
    //       expanded: false,
    //       order: 700,
    //     }
    //   },
    //   children: [
    //     {
    //       path: '',
    //       data: {
    //         menu: {
    //           title: 'general.menu.menu_level_1_1',
    //           url: '#'
    //         }
    //       }
    //     },
    //     {
    //       path: '',
    //       data: {
    //         menu: {
    //           title: 'general.menu.menu_level_1_2',
    //           url: '#'
    //         }
    //       },
    //       children: [
    //         {
    //           path: '',
    //           data: {
    //             menu: {
    //               title: 'general.menu.menu_level_1_2_1',
    //               url: '#'
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   path: '',
    //   data: {
    //     menu: {
    //       title: 'general.menu.external_link',
    //       url: 'http://akveo.com',
    //       icon: 'ion-android-exit',
    //       order: 800,
    //       target: '_blank'
    //     }
    //   }
    // }
  ]
}];
