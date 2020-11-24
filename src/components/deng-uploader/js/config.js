//允许上传的文件类型,可选文件类型列表
export const ACCEPT_CONFIG = {
    image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    video: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv'],
    document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
	otherFile:['.zip','.rar'],
    getAll(){
        return [...this.image, ...this.video, ...this.document,...this.otherFile]
    },
};