import { ref } from "vue";
import { facedown, ttdown, instadown, ccdl } from "./utils";
import type { Tiktok, Instagram, Capcut } from "./utils/intefaces";
import { computed } from "vue";
import { useToast } from "primevue/usetoast";

export default function useAppLogic() {
  const toast = useToast();

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
        toast.add({
          severity: "success",
          summary: "Tautan Disalin",
          detail: "Tautan download telah disalin ke clipboard.",
          life: 3000,
        });
      } catch (err) {
        console.error("Gagal menyalin ke clipboard:", err);
        toast.add({
          severity: "error",
          summary: "Gagal Menyalin",
          detail: "Tidak dapat menyalin tautan ke clipboard.",
          life: 3000,
        });
      }
    }
  }

  const downloadLink = ref("");
  const selectedPlatform = ref("");
  const isLoading = ref(false);

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Ekstrak URL jika ada teks lain di sekitarnya
      const urlRegex = /(https?:\/\/[^\s]+)/;
      const match = text.match(urlRegex);
      downloadLink.value = match ? match[0] : text.trim();
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      toast.add({
        severity: "error",
        summary: "Gagal Membaca Clipboard",
        detail: "Tidak dapat membaca konten dari clipboard.",
        life: 3000,
      });
    }
  };

  const isFacebookDialogVisible = ref(false);
  const facebookDownloadData = ref<{ Normal_video?: string; HD?: string }>({});

  const isTiktokDialogVisible = ref(false);
  const tiktokDownloadData = ref<Partial<Tiktok>>({});

  const isInstagramDialogVisible = ref(false);
  const instagramDownloadData = ref<Partial<Instagram>>({});

  const isCapcutDialogVisible = ref(false);
  const capcutDownloadData = ref<Partial<Capcut>>({});

  const isErrorDialogVisible = ref(false);
  const errorMessage = ref("");

  const platforms = [
    { label: "TikTok", value: "tiktok" },
    { label: "Instagram", value: "instagram" },
    { label: "Facebook", value: "facebook" },
    { label: "Capcut", value: "capcut" },
  ];

  const handleDownload = async () => {
    if (downloadLink.value && selectedPlatform.value) {
      // Ekstrak URL jika pengguna paste teks yang mengandung karakter tak perlu
      const urlRegex = /(https?:\/\/[^\s]+)/;
      const match = downloadLink.value.match(urlRegex);
      const url = match ? match[0] : downloadLink.value.trim();

      // Update kotak input dengan link yang sudah bersih
      downloadLink.value = url;

      let isValid = false;

      switch (selectedPlatform.value) {
        case "tiktok":
          isValid = url.includes("tiktok.com");
          break;
        case "instagram":
          isValid = url.includes("instagram.com");
          break;
        case "facebook":
          isValid = url.includes("facebook.com") || url.includes("fb.watch");
          break;
        case "capcut":
          isValid = url.includes("capcut.com");
          break;
        default:
          isValid = true;
      }

      if (!isValid) {
        errorMessage.value = `Link yang dimasukkan tidak valid untuk platform ${selectedPlatform.value.toUpperCase()}. Pastikan link sesuai dengan platform yang dipilih.`;
        isErrorDialogVisible.value = true;
        return;
      }

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
          if (Array.isArray(data) && data.length > 0 && data[0].status) {
            isInstagramDialogVisible.value = true;
            instagramDownloadData.value = data[0];
          } else if (data.status) {
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
  return {
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
    isShareSupported,
    shareContent,
    pasteFromClipboard,
    handleDownload,
  };
}
