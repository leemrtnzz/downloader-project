export interface Tiktok {
    status:      boolean;
    title:       string;
    title_audio: string;
    thumbnail:   string;
    video:       string[];
    audio:       string[];
    creator:     string;
}
export interface Facebook {
    status:       boolean;
    developer:    string;
    Normal_video: string;
    HD:           string;
}
export interface Instagram {
    status:    boolean;
    creator:   string;
    thumbnail: string;
    url:       string;
}
export interface Capcut {
    status:           boolean;
    code:             number;
    title:            string;
    originalVideoUrl: string;
    coverUrl:         string;
    authorName:       string;
}
