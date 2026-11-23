import {chromium} from 'playwright';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
const out='artifacts/promotion';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
for(const [lang,title,sub,disclosure] of [['en','Same structure. New story.','New person. New product. New setting.','AI demo footage · generated manually with Jimeng'],['zh','保留结构，换一个故事','换人物 · 换商品 · 换场景','AI 演示素材 · 由即梦手动生成']]){
 const page=await browser.newPage({viewport:{width:1280,height:180}});
 await page.setContent('<body style="margin:0;background:#111;color:#fff;font-family:Arial,sans-serif;text-align:center"><div style="font-size:36px;font-weight:bold;padding-top:18px">ViralForge · '+title+'</div><div style="font-size:22px;color:#c9ff3d;margin:10px">'+sub+'</div><div style="font-size:16px;color:#aaa">'+disclosure+' | wearai.net/ai-video-generator</div></body>');
 await page.screenshot({path:out+'/'+lang+'-title.png'});await page.close();
 const result=spawnSync('ffmpeg',['-v','error','-y','-i','artifacts/viralforge-demo/campus-original.mp4','-i','artifacts/viralforge-demo/campus-replaced.mp4','-loop','1','-i',out+'/'+lang+'-title.png','-filter_complex','[0:v]scale=640:360[a];[1:v]scale=640:360[b];[a][b]hstack=inputs=2,pad=1280:540:0:180:black[v];[v][2:v]overlay=0:0[out]','-map','[out]','-map','0:a?','-t','10.08','-c:v','libx264','-crf','22','-pix_fmt','yuv420p','-c:a','aac','-movflags','+faststart',out+'/viralforge-'+lang+'.mp4'],{stdio:'inherit'});if(result.status)throw Error('render failed');
}
await browser.close();
