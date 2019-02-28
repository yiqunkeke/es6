class Timer {
    countdown(end,update,handle) {
        // end --截止时间
        // update --时间更新回调
        // handle --倒计时结束之后的回调

        const now = new Date().getTime(); // 当前时间
        const self = this; // 当前对象指针
        if(now-end) {
            // 如果当前时间大于截止时间，说明倒计时结束
            handle.call(self);  // 执行倒计时结束的回调
        } else {
            let last_time = end - now; // 当前时间离截止时间的剩余时间
            const px_d = 1000*60*60*24; // 1天总共的毫秒数
            const px_h = 1000*60*60; // 1小时总共的毫秒数
            const px_m = 1000*60; // 1分钟--毫秒数
            const px_s = 1000; // 1s--毫秒数
            let d = Math.floor(last_time/px_d); // 剩余时间包含多少天
            let h = Math.floor((last_time - d*px_d)/px_h); // 剩余多少小时
            let m = Math.floor((last_time - d*px_d - h*px_h)/px_m); // 剩余的分钟数
            let s = Math.floor((last_time - d*px_d - h*px_h - m*px_m)/px_s); // 剩余多少秒

            let r=[];
            // 天
            if(d>0) {
                r.push(`<em>${d}</em>天`);
            }
            // 时
            if(r.length||(h>0)) {
                r.push(`<em>${h}</em>时`);
            }
            // 分
            if(r.length||(m>0)) {
                r.push(`<em>${m}</em>分`);
            }
            // 秒
            if(r.length||(s>0)) {
                r.push(`<em>${s}</em>秒`);
            }

            self.last_time = r.join('');
            update.call(self, r.join('')); // 完成当前的更新
            setTimeout(function () {    // 重新调用倒计时
                self.countdown(end,update,handle);
            },1000);
        }
    }
}
export default Timer