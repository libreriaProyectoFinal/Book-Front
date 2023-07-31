import * as types from '../actions/types';

const initialState = {
    flagNav: "0",
    generonav: "all",
    titulonav: "todo",
    loggedUser:"claudiodavid339@gmail.com",
    libros: [],
    librosGenero:[],
    librosOriginal: [],
    libro: {},
    generos:[],
    details: [],
    carrito:[],
    LibroActualizado: {},
    LibroEliminado: {},
    LibroAgregado: {},
    LibroFiltrado: [],
    LibroOrdenado: [],
    PaginaActual: 1,
    localizaciones: [],
    user:null,
}
/* waldir
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: payload.productos,
        allProductsAux: payload.productos,
        paginas: payload.totalPages,
      };

*/


const rootReducer = (state = initialState,{ type, payload }) => {
    switch (type) {
        case "OBTENER_TODOS_LIBROS":
            return {
                ...state,
                libros: payload,
                librosOriginal: payload
            }

        case "LIBROS_GENERO":
         return {
             ...state,
             libros: payload,      
             librosOriginal: payload
         }

       case "OBTIENE_GENEROS":
          return {
           ...state,
           generos: payload,      
         }

       case "LIBROS_TITULO":
        return {
            ...state,
            libros: payload,      
            librosOriginal: payload
        }

       case "AGREGAR_AL_CARRITO":
        return {
          ...state,
          carrito: [...state.carrito, payload],
        };
           
       case "DETALLE_LIBRO":
        return {
          ...state,
          details: payload  ,
        };

       case "BORRA_LIBROCARRO":
        const updatedCarritox = state.carrito.filter(product => product.idlibro !== payload);
        return {
          ...state,
          carrito: updatedCarritox
        };

       case "LIMPIAR_CARRITO":
        return { ...initialState, };
            
       case "REINICIA_STORE":
        return {        
          flagNav: "0",
          generonav:"",
          titulonav:"todo",
          loggedUser:"claudiodavid339@gmail.com",
          libros: [],
          librosGenero:[],
          librosOriginal: [],
          libro: {},
          generos:[],
          details: [],
          carrito:[],
          LibroActualizado: {},
          LibroEliminado: {},
          LibroAgregado: {},
          LibroFiltrado: [],
          LibroOrdenado: [],
          PaginaActual: 1,
          localizaciones: []
        };

        case 'UPDATE_CARRITO':
         const { idlibro, imagen, nombrelibro, preciolibro, cantidad, subtotalitem } = payload;
        
         const updatedCarrito = state.carrito.map((producto) => {
           if (producto.idlibro === idlibro) {
             return {
               ...producto,
               idlibro,
               imagen,
               nombrelibro,
               preciolibro,
               cantidad,                        
               subtotalitem
             };
           }
           return producto; });
        
           return {
             ...state,
             carrito: updatedCarrito
           }; 
           
           case 'CAMBIAR_FLAG_NAV':
            return {
              ...state,
              flagNav: payload,
            };

            case 'CAMBIAR_GEN':
             return {
               ...state,
               generonav: payload,
             };

             case 'CAMBIAR_TITULO':
              return {
                ...state,
                titulonav: payload,
              };
            /**
             *     case GET_DETAIL:
      return {
        ...state,
        details: payload,
      };
             */

            /**
              
             
    case GET_DETAIL:
      return {
        ...state,
        details: payload,
      };
 
             
             */

        case types.OBTENER_LIBRO_POR_ID:
            return {
                ...state,
                libro: payload
            }
        case types.AGREGAR_LIBRO:
            return {
                ...state,
                LibroAgregado: payload
            }
        case types.ELIMINAR_LIBRO:
            return {
                ...state,
                LibroEliminado: payload
            }
        case types.ACTUALIZAR_LIBRO:
            return {
                ...state,
                LibroActualizado: payload
            }
        case types.FILTRAR_LIBROS:
            return {
                ...state,
                LibroFiltrado: payload
            }
        case types.QUITAR_FILTRO:
            return {
                ...state,
                libros: state.librosOriginal
            }
        case types.ORDENAR_LIBROS:
            
        case types.QUITAR_ORDEN:
            return {
                ...state,
                libros: state.librosOriginal
            }
        case types.SIGUIENTE_PAGINA:
            return {
                ...state,
                PaginaActual: state.PaginaActual + 1
            }
        case types.PAGINA_ANTERIOR:
            return {
                ...state,
                PaginaActual: state.PaginaActual - 1
            }
        case types.AGREGAR_LOCALIZACION:
            return {
                ...state,
                localizaciones: payload
            }
        case types.BUSCAR_LIBRO_POR_TITULO:
            return {
                ...state,
                libro: payload
            }
            case 'LOGIN_USER':
              return {
                  ...state,
                  user: payload,
              };
          case 'LOGOUT_USER':
          return {
              ...state,
              user: null,
          };
  


        default:
            return state


}





}

export default rootReducer
