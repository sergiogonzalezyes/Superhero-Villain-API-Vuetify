import { defineStore } from 'pinia'

export const useHeroStore = defineStore(() => {
    const heroes = []

    return {
        heroes,
    }
  })
  