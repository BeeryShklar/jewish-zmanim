import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export const date: Writable<Date> = writable(new Date(Date.now()))
export const jewish: Writable<boolean> = writable(true)
export const lang: Writable<string> = writable('he')
export const isHebrew: Writable<boolean> = writable(true)

export let coords: Writable<[lng: number, lat: number]> = writable([undefined, undefined]) // Jerusalem longitude
