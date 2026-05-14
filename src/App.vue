<script setup lang="ts">
import { ref } from "vue";
import { facedown, ttdown, instadown, ccdl } from "./utils";
import type { Tiktok, Instagram, Capcut } from "./utils/intefaces";
import { computed } from "vue";

// Cek apakah browser mendukung Web Share API (Mayoritas Android & iOS mendukung ini)
const isShareSupported = computed(() => {
  return typeof navigator !== "undefined" && !!navigator.share;
});

// Fungsi untuk mengeksekusi menu share bawaan HP atau fallback ke copy link
async function shareContent(title: string, url: string | undefined) {
  if (!url) return;

  if (isShareSupported.value) {
    try {
      await navigator.share({
        title: `Unduh Konten dari ${title}`,
        text: "Lihat konten yang saya temukan lewat Downloader ini!",
        url: url, // Mengirim link download konten
      });
    } catch (error) {
      // Menghindari log error jika pengguna membatalkan/menutup menu share
      if ((error as Error).name !== "AbortError") {
        console.error("Gagal membagikan tautan:", error);
      }
    }
  } else {
    // Fallback untuk browser PC/HTTP biasa (Salin teks ke clipboard)
    try {
      await navigator.clipboard.writeText(url);
      alert("Tautan unduhan berhasil disalin ke clipboard!");
    } catch (err) {
      console.error("Gagal menyalin ke clipboard:", err);
      alert("Gagal menyalin tautan.");
    }
  }
}

const downloadLink = ref("");
const selectedPlatform = ref("");
const isLoading = ref(false);

const isFacebookDialogVisible = ref(false);
const facebookDownloadData = ref<{ Normal_video?: string; HD?: string }>({});

const isTiktokDialogVisible = ref(false);
const tiktokDownloadData = ref<Partial<Tiktok>>({});

const isInstagramDialogVisible = ref(false);
const instagramDownloadData = ref<Partial<Instagram>>({});

const isCapcutDialogVisible = ref(false);
const capcutDownloadData = ref<Partial<Capcut>>({});

const platforms = [
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Capcut", value: "capcut" },
];

const handleDownload = async () => {
  if (downloadLink.value && selectedPlatform.value) {
    isLoading.value = true;
    console.log(
      `Downloading from ${selectedPlatform.value}: ${downloadLink.value}`,
    );
    if (selectedPlatform.value === "tiktok") {
      try {
        const data = await ttdown(downloadLink.value);
        if (data.status) {
          isTiktokDialogVisible.value = true;
          tiktokDownloadData.value = data;
        } else {
          isTiktokDialogVisible.value = false;
          tiktokDownloadData.value = {};
        }
      } catch (error) {
        console.error("Error fetching TikTok download:", error);
      }
    } else if (selectedPlatform.value === "instagram") {
      try {
        const data = await instadown(downloadLink.value);
        if (data.status) {
          isInstagramDialogVisible.value = true;
          instagramDownloadData.value = data;
        } else {
          isInstagramDialogVisible.value = false;
          instagramDownloadData.value = {};
        }
      } catch (error) {
        console.error("Error fetching Instagram download:", error);
      }
    } else if (selectedPlatform.value === "facebook") {
      try {
        const data = await facedown(downloadLink.value);
        if (data.status) {
          isFacebookDialogVisible.value = true;
          facebookDownloadData.value = data;
        } else {
          isFacebookDialogVisible.value = false;
          facebookDownloadData.value = {};
        }
      } catch (error) {
        console.error("Error fetching Facebook download:", error);
      }
    } else if (selectedPlatform.value === "youtube") {
      console.log("Initiating YouTube download...");
    } else if (selectedPlatform.value === "capcut") {
      try {
        const data = await ccdl(downloadLink.value);
        if (data.status) {
          isCapcutDialogVisible.value = true;
          capcutDownloadData.value = data;
        } else {
          isCapcutDialogVisible.value = false;
          capcutDownloadData.value = {};
        }
      } catch (error) {
        console.error("Error fetching Capcut download:", error);
      }
    }
    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
  >
    <!-- Header -->
    <header
      class="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50"
    >
      <div class="max-w-5xl flex items-center justify-center px-6 py-6">
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
          >
            <path d="M0 0h16v16H0z" fill="none" />
            <path
              fill="#ffb829"
              d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"
            />
          </svg>

          <div>
            <h1 class="text-2xl font-bold text-white">Quick Downloader</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-6 py-12">
      <!-- Info Card -->
      <Card class="mb-8 bg-slate-800 border border-slate-700">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-info-circle text-blue-400"></i>
            <span class="text-white">Tentang Aplikasi</span>
          </div>
        </template>
        <template #content>
          <p class="text-slate-300 m-0">
            Aplikasi downloader cepat dan mudah untuk mengunduh konten dari
            berbagai platform media sosial. Cukup masukkan link dan pilih
            platform, maka file Anda akan siap diunduh.
          </p>
        </template>
      </Card>

      <!-- Download Form -->
      <Card class="bg-slate-800 border border-slate-700">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-cog text-purple-400"></i>
            <span class="text-white">Mulai Mengunduh</span>
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-6">
            <!-- Platform Selection -->
            <div>
              <label class="block text-sm font-semibold text-slate-300 mb-3"
                >Pilih Platform</label
              >
              <div class="flex flex-wrap gap-3">
                <Button
                  v-for="platform in platforms"
                  :key="platform.value"
                  :label="platform.label"
                  :severity="
                    selectedPlatform === platform.value ? 'info' : 'secondary'
                  "
                  @click="selectedPlatform = platform.value"
                  class="flex-1 min-w-32"
                />
              </div>
            </div>

            <Divider />

            <!-- Link Input -->
            <div>
              <label
                for="downloadLink"
                class="block text-sm font-semibold text-slate-300 mb-3"
                >Masukkan Link</label
              >
              <InputText
                id="downloadLink"
                v-model="downloadLink"
                placeholder="Paste link konten di sini..."
                class="w-full"
                :disabled="!selectedPlatform"
              />
              <Message
                v-if="selectedPlatform"
                severity="info"
                :closable="false"
                class="mt-3 bg-blue-900/30 border border-blue-700"
              >
                <div class="text-sm text-blue-200">
                  Siap mengunduh dari
                  <strong>{{ selectedPlatform.toUpperCase() }}</strong>
                </div>
              </Message>
              <Message
                v-else
                severity="warn"
                :closable="false"
                class="mt-3 bg-amber-900/30 border border-amber-700"
              >
                <div class="text-sm text-amber-200">
                  Silakan pilih platform terlebih dahulu
                </div>
              </Message>
            </div>

            <Divider />

            <!-- Download Button -->
            <Button
              label="Mulai Unduh"
              icon="pi pi-download"
              @click="handleDownload"
              :loading="isLoading"
              :disabled="!downloadLink || !selectedPlatform || isLoading"
              class="w-full py-3 text-base font-semibold"
              severity="success"
            />
          </div>
        </template>
      </Card>

      <!-- Footer Info -->
      <div class="mt-12 text-center text-slate-400 text-sm">
        <p>Made with ❤️ by Ichsan Haekal</p>
      </div>

      <!-- Facebook Download Dialog -->
      <Dialog
        v-model:visible="isFacebookDialogVisible"
        modal
        header="Pilih Kualitas Video"
        :style="{ width: '25rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :pt="{
          root: {
            class: 'bg-slate-800 border border-slate-700 rounded-xl shadow-2xl',
          },
          header: {
            class:
              'bg-slate-800 border-b border-slate-700 text-white rounded-t-xl pb-4',
          },
          content: { class: 'bg-slate-800 text-white p-6 rounded-b-xl' },
          closeButton: {
            class: 'text-slate-300 hover:text-white hover:bg-slate-700',
          },
        }"
      >
        <div class="flex flex-col gap-4 mt-2">
          <a
            v-if="facebookDownloadData.Normal_video"
            :href="facebookDownloadData.Normal_video"
            target="_blank"
            class="w-full no-underline"
          >
            <Button
              label="Kualitas Normal"
              icon="pi pi-video"
              class="w-full py-3"
              severity="secondary"
              outlined
            />
          </a>
          <a
            v-if="facebookDownloadData.HD"
            :href="facebookDownloadData.HD"
            target="_blank"
            class="w-full no-underline"
          >
            <Button
              label="Kualitas HD"
              icon="pi pi-star-fill"
              class="w-full py-3"
              severity="info"
            />
          </a>
        </div>
      </Dialog>

      <!-- TikTok Download Dialog -->
      <Dialog
        v-model:visible="isTiktokDialogVisible"
        modal
        header="Download TikTok"
        :style="{ width: '25rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :pt="{
          root: {
            class: 'bg-slate-800 border border-slate-700 rounded-xl shadow-2xl',
          },
          header: {
            class:
              'bg-slate-800 border-b border-slate-700 text-white rounded-t-xl pb-4',
          },
          content: { class: 'bg-slate-800 text-white p-6 rounded-b-xl' },
          closeButton: {
            class: 'text-slate-300 hover:text-white hover:bg-slate-700',
          },
        }"
      >
        <div class="flex flex-col gap-4 mt-2">
          <div
            v-if="tiktokDownloadData.thumbnail"
            class="w-full flex justify-center mb-2"
          >
            <img
              :src="tiktokDownloadData.thumbnail"
              class="w-32 h-auto rounded-lg shadow-md"
              alt="Thumbnail"
            />
          </div>
          <div class="text-center mb-2">
            <h3 class="text-lg font-semibold">
              {{ downloadLink.match(/@[\w.-]+/)?.[0] }}
            </h3>
            <p
              class="text-sm text-slate-400 line-clamp-2 mt-1"
              v-if="tiktokDownloadData.title"
            >
              {{ tiktokDownloadData.title }}
            </p>
          </div>
          <a
            v-if="
              tiktokDownloadData.video && tiktokDownloadData.video.length > 0
            "
            :href="tiktokDownloadData.video[0]"
            target="_blank"
            class="w-full no-underline"
          >
            <Button
              label="Download Video"
              icon="pi pi-video"
              class="w-full py-3"
              severity="info"
            />
          </a>
          <a
            v-if="
              tiktokDownloadData.audio && tiktokDownloadData.audio.length > 0
            "
            :href="tiktokDownloadData.audio[0]"
            target="_blank"
            class="w-full no-underline"
          >
            <Button
              label="Download Audio"
              icon="pi pi-music"
              class="w-full py-3"
              severity="secondary"
              outlined
            />
          </a>
          <!-- TOMBOL SHARE: Akan share di HP, atau copy link di PC/HTTP -->
          <Button
            label="Bagikan Tautan"
            icon="pi pi-share-alt"
            class="w-full py-3 mt-2"
            severity="help"
            outlined
            @click="
              shareContent(
                tiktokDownloadData.creator || 'TikTok',
                tiktokDownloadData.video?.[0] || tiktokDownloadData.audio?.[0],
              )
            "
          />
        </div>
      </Dialog>

      <!-- Instagram Download Dialog -->
      <Dialog
        v-model:visible="isInstagramDialogVisible"
        modal
        header="Download Instagram"
        :style="{ width: '25rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :pt="{
          root: {
            class: 'bg-slate-800 border border-slate-700 rounded-xl shadow-2xl',
          },
          header: {
            class:
              'bg-slate-800 border-b border-slate-700 text-white rounded-t-xl pb-4',
          },
          content: { class: 'bg-slate-800 text-white p-6 rounded-b-xl' },
          closeButton: {
            class: 'text-slate-300 hover:text-white hover:bg-slate-700',
          },
        }"
      >
        <div class="flex flex-col gap-4 mt-2">
          <div
            v-if="instagramDownloadData.thumbnail"
            class="w-full flex justify-center mb-2"
          >
            <img
              :src="instagramDownloadData.thumbnail"
              class="w-32 h-auto rounded-lg shadow-md"
              alt="Thumbnail"
            />
          </div>
          <div class="text-center mb-2">
            <h3 class="text-lg font-semibold">
              {{ instagramDownloadData.creator || "Instagram Content" }}
            </h3>
          </div>
          <a
            v-if="instagramDownloadData.url"
            :href="instagramDownloadData.url"
            target="_blank"
            class="w-full no-underline"
          >
            <Button
              label="Download Konten"
              icon="pi pi-download"
              class="w-full py-3"
              severity="info"
            />
          </a>
          <!-- TOMBOL SHARE: Akan share di HP, atau copy link di PC/HTTP -->
          <Button
            label="Bagikan Tautan"
            icon="pi pi-share-alt"
            class="w-full py-3 mt-2"
            severity="help"
            outlined
            @click="
              shareContent(
                instagramDownloadData.creator || 'Instagram',
                instagramDownloadData.url,
              )
            "
          />
        </div>
      </Dialog>

      <!-- Capcut Download Dialog -->
      <Dialog
        v-model:visible="isCapcutDialogVisible"
        modal
        header="Download Capcut"
        :style="{ width: '25rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :pt="{
          root: {
            class: 'bg-slate-800 border border-slate-700 rounded-xl shadow-2xl',
          },
          header: {
            class:
              'bg-slate-800 border-b border-slate-700 text-white rounded-t-xl pb-4',
          },
          content: { class: 'bg-slate-800 text-white p-6 rounded-b-xl' },
          closeButton: {
            class: 'text-slate-300 hover:text-white hover:bg-slate-700',
          },
        }"
      >
        <div class="flex flex-col gap-4 mt-2">
          <div
            v-if="capcutDownloadData.coverUrl"
            class="w-full flex justify-center mb-2"
          >
            <img
              :src="capcutDownloadData.coverUrl"
              class="w-32 h-auto rounded-lg shadow-md"
              alt="Thumbnail"
            />
          </div>
          <div class="text-center mb-2">
            <h3 class="text-lg font-semibold">
              {{ capcutDownloadData.authorName || "Capcut Template" }}
            </h3>
            <p
              class="text-sm text-slate-400 line-clamp-2 mt-1"
              v-if="capcutDownloadData.title"
            >
              {{ capcutDownloadData.title }}
            </p>
          </div>
          <a
            v-if="capcutDownloadData.originalVideoUrl"
            :href="capcutDownloadData.originalVideoUrl"
            target="_blank"
            class="w-full no-underline"
          >
            <Button
              label="Download Video"
              icon="pi pi-video"
              class="w-full py-3"
              severity="info"
            />
          </a>
          <!-- TOMBOL SHARE: Akan share di HP, atau copy link di PC/HTTP -->
          <Button
            label="Bagikan Tautan"
            icon="pi pi-share-alt"
            class="w-full py-3 mt-2"
            severity="help"
            outlined
            @click="
              shareContent(
                capcutDownloadData.authorName || 'Capcut',
                capcutDownloadData.originalVideoUrl,
              )
            "
          />
        </div>
      </Dialog>
    </main>
  </div>
</template>
