import { writable } from "svelte/store"

const layoutStore = () => {

  let state = {
    menu: false,
    page: 'home'
  }

  const { subscribe, set, update } = writable(state)

  const methods = {
    init:  () => { /*  */ },
    reset: () => { return set(state) },
    menuToggle: () => {
      let m
      update(s=>{
        s.menu = !s.menu
        m = s.menu
        return s
      })
      return m
    },
    // updatePath: p => {update(s=>{s.path = p;return s})},
  }

  return { subscribe, set, update, ...methods }

}

export const Layout = layoutStore()
