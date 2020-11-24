import request from '@/plugin/axios'

export function GetMenuList() {
    return request({
        url: '/GetMenuList',
        method: 'post',
        interfaceCheck: true,
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        }
    })
}
export function  OperMenu(data) {
    return request({
        url: '/OperMenu',
        method: 'post',
        data
    })
}