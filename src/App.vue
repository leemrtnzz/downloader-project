<script setup lang="ts">
import useAppLogic from "./logic_app";

// Lakukan destructuring untuk mengambil semua variabel dan fungsinya yang dibutuhkan template
const {
  downloadLink,
  selectedPlatform,
  isLoading,
  isFacebookDialogVisible,
  facebookDownloadData,
  isTiktokDialogVisible,
  tiktokDownloadData,
  isInstagramDialogVisible,
  instagramDownloadData,
  isCapcutDialogVisible,
  capcutDownloadData,
  isErrorDialogVisible,
  errorMessage,
  platforms,
  shareContent,
  pasteFromClipboard,
  handleDownload,
} = useAppLogic();
</script>
>

<template>
  <Toast />
  <div
    class="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
  >
    <!-- Header -->
    <header
      class="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50"
    >
      <div class="max-w-5xl mx-auto flex items-center justify-center px-6 py-6">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <g
                fill="none"
                stroke="#23bef5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <rect width="6.5" height="6.5" x="3.75" y="3.75" rx="2" />
                <path d="M17 3.75V7m0 0v3.25M17 7h-3.25M17 7h3.25" />
                <rect width="6.5" height="6.5" x="3.75" y="13.75" rx="2" />
                <rect width="6.5" height="6.5" x="13.75" y="13.75" rx="2" />
              </g>
            </svg>

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="#23f581"
                d="M11 6v8l-3.5-3.5l-1.42 1.42L12 17.84l5.92-5.92l-1.42-1.42L13 14V6zm1 16A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10"
              />
            </svg>

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
            <div class="w-full flex flex-row items-center gap-2">
              <!-- Kolom Input (Tetap Gelap Elegan) -->
              <InputText
                id="downloadLink"
                v-model="downloadLink"
                placeholder="Paste link konten di sini..."
                class="flex-1 pl-4 py-3.5 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                :disabled="!selectedPlatform"
              />

              <!-- Tombol Paste dengan Background Terang Solid -->
              <button
                class="bg-blue-500 p-2.5 rounded-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-slate-700 disabled:hover:bg-slate-700"
                @click="pasteFromClipboard"
                :disabled="!selectedPlatform"
              >
                <svg
                  xmlns="http://w3.org"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-enabled:text-slate-900 group-disabled:text-slate-500"
                >
                  <path
                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                  />
                  <rect
                    x="8"
                    y="2"
                    width="8"
                    height="4"
                    rx="1"
                    ry="1"
                    fill="currentColor"
                    class="fill-slate-900/10 group-disabled:fill-transparent"
                  />
                  <path d="M9 10h6" />
                  <path d="M9 14h6" />
                  <path d="M9 18h4" />
                </svg>
              </button>
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
        <p class="flex items-center justify-center gap-2">
          Made with
          <span class="-mr-1"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 48 48"
            >
              <path d="M0 0h48v48H0z" fill="none" />
              <g fill="none" stroke="#f52323" stroke-width="4">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.54 20.019q-2.532-3.113-4.754-1.337C7.563 20.458 6.925 26.65 8.713 32.11s5.267 12.893 12.289 12.893S29.684 37.522 32.548 33c2.865-4.522 4.38-8.885 1.573-14.318"
                />
                <path
                  stroke-linecap="round"
                  d="M11 18.037A643 643 0 0 0 7 12c-1.446-2.145 2.251-4.918 4-3.032q1.749 1.887 4.647 5.557"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.024 25.64q-.727-9.096 1.182-11.845c1.91-2.75 5.457-3.792 8.798-3.792q2.983 0 5.448 2.541"
                />
                <path
                  d="M41 12.613c.586 2.036-.37 3.897-3.316 4.318s-5.153 1.902-6.745 3.148s-4.44 5.026-5.003 6.923s-3.776.153-4.639-.605c-.863-.757-1.712-2.416 0-4.151s1.341-2.081 1.341-3.84c0-1.76 9.362-7.58 14.635-8.112c1.172-.068 3.142.282 3.727 2.319Z"
                  clip-rule="evenodd"
                />
                <path
                  stroke-linecap="round"
                  d="M23.008 4v5.263m-2.701 1.455q-4.527-5.69-7.3-6.35m3.997 2.661l.99-4.067m17.619 7.756q-.483 1.656 0 3.106q.484 1.45 2.071 3.107"
                />
              </g>
            </svg> </span
          >by Ichsan Haekal
        </p>
      </div>

      <!-- Error Validation Dialog -->
      <Dialog
        v-model:visible="isErrorDialogVisible"
        modal
        header="Platform Tidak Sesuai"
        :style="{ width: '25rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :pt="{
          root: {
            class: 'bg-slate-800 border border-slate-700 rounded-xl shadow-2xl',
          },
          header: {
            class:
              'bg-slate-800 border-b border-slate-700 text-amber-500 font-bold rounded-t-xl pb-4',
          },
          content: { class: 'bg-slate-800 text-white p-6 rounded-b-xl' },
          closeButton: {
            class: 'text-slate-300 hover:text-white hover:bg-slate-700',
          },
        }"
      >
        <div class="flex flex-col gap-4 mt-2 items-center text-center">
          <i class="pi pi-exclamation-triangle text-amber-500 text-5xl"></i>
          <p class="text-slate-200">{{ errorMessage }}</p>
          <Button
            label="Mengerti"
            severity="secondary"
            outlined
            class="w-full mt-2"
            @click="isErrorDialogVisible = false"
          />
        </div>
      </Dialog>

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
          <!-- TOMBOL SHARE: Akan share di HP, atau copy link di PC/HTTP -->
          <Button
            label="Bagikan Tautan"
            icon="pi pi-share-alt"
            class="w-full py-3 mt-2"
            severity="help"
            outlined
            @click="
              shareContent(
                'Facebook Video',
                facebookDownloadData.HD || facebookDownloadData.Normal_video,
              )
            "
          />
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
              {{ "Instagram Content" }}
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
