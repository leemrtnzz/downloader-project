import { type Tiktok, type Instagram, type Facebook, type Capcut } from "./intefaces.ts"
const baseurl = `https://backend1.tioo.eu.org`
/**
 * Mengunduh video atau audio dari TikTok menggunakan API backend.
 * 
 * @param {string} url - Tautan/URL video TikTok yang ingin diunduh.
 * @returns {Promise<Tiktok>} Objek yang berisi data hasil ekstraksi video dan audio TikTok.
 * @throws {Error} Jika request gagal atau terjadi kesalahan server.
 */
export async function ttdown (url: string): Promise<Tiktok> {
    const response = await fetch(`${baseurl}/ttdl?url=${encodeURIComponent(url)}`)
    if (!response.ok) {
        throw new Error("Gagal mengunduh video")
    }
    const data = await response.json()
    return data
}

/**
 * Mengunduh video atau audio dari Instagram menggunakan API backend.
 * 
 * @param {string} url - Tautan/URL video Instagram yang ingin diunduh.
 * @returns {Promise<Instagram>} Objek yang berisi data hasil ekstraksi video Instagram.
 * @throws {Error} Jika request gagal atau terjadi kesalahan server.
 */
export async function instadown(url: string): Promise<Instagram> {
    const response = await fetch(`${baseurl}/igdl?url=${encodeURIComponent(url)}`)
    if (!response.ok) {
        throw new Error("Gagal mengunduh video")
    }
    const data = await response.json()
    return data
}

/**
 * Mengunduh video atau audio dari Facebook menggunakan API backend.
 * 
 * @param {string} url - Tautan/URL video Facebook yang ingin diunduh.
 * @returns {Promise<Facebook>} Objek yang berisi data hasil ekstraksi video Facebook.
 * @throws {Error} Jika request gagal atau terjadi kesalahan server.
 */
export async function facedown(url: string): Promise<Facebook> {
    const response = await fetch(`${baseurl}/fbdown?url=${encodeURIComponent(url)}`)
    if (!response.ok) {
        throw new Error("Gagal mengunduh video")
    }
    const data = await response.json()
    return data
}
/**
 * Mengunduh video atau audio dari Facebook menggunakan API backend.
 * 
 * @param {string} url - Tautan/URL video Facebook yang ingin diunduh.
 * @returns {Promise<Facebook>} Objek yang berisi data hasil ekstraksi video Facebook.
 * @throws {Error} Jika request gagal atau terjadi kesalahan server.
 */
export async function ccdl(url: string): Promise<Capcut> {
    const response = await fetch(`${baseurl}/capcut?url=${encodeURIComponent(url)}`)
    if (!response.ok) {
        throw new Error("Gagal mengunduh video")
    }
    const data = await response.json()
    return data
}