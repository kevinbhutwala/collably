export class MediaService {
  /**
   * Direct video and file uploads have been deprecated in favor of external
   * cloud links (Google Drive, Dropbox, Frame.io).
   */
  async generateUploadSignature(): Promise<never> {
    throw new Error(
      "Direct video uploads are disabled. Please submit an external cloud link (Google Drive, Dropbox, Frame.io) instead."
    );
  }

  async getSignedDownloadUrl(storagePath: string, bucket: string = "portfolio"): Promise<string> {
    return `/api/media/download?path=${encodeURIComponent(storagePath)}&bucket=${bucket}`;
  }
}

export const mediaService = new MediaService();
