from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import textwrap

OUT=Path(__file__).parent
BG='#EAECE7'; PAPER='#F6F6F3'; INK='#20211F'; MUTED='#686B63'; LINE='#DEDFDA'
def font(n,b=False): return ImageFont.truetype('C:/Windows/Fonts/'+('malgunbd.ttf' if b else 'malgun.ttf'),n)
def text(x,y,s,n=16,c=INK,b=False):
    d.text((x,y),s,font=font(n,b),fill=c)
def wrapped(x,y,s,width=330,n=17,c=INK,line=29):
    for para in s.split('\n'):
        current=''
        for word in para.split(' '):
            candidate=(current+' '+word).strip()
            if d.textlength(candidate,font=font(n))>width and current:
                text(x,y,current,n,c); y+=line; current=word
            else: current=candidate
        if current: text(x,y,current,n,c); y+=line
        y+=12
    return y
def rule(x,y,w=342): d.line((x,y,x+w,y),fill=LINE,width=1)
def button(x,y,label,w=342,primary=True):
    d.rounded_rectangle((x,y,x+w,y+50),radius=12,fill=INK if primary else '#FFFFFF',outline=None if primary else LINE)
    tw=d.textlength(label,font=font(16,True));text(x+(w-tw)/2,y+13,label,16,'#FFFFFF' if primary else INK,True)
def shell(x,label,title,back=True):
    text(x,154,label,15,MUTED,True)
    d.rounded_rectangle((x,190,x+390,1034),radius=26,fill=PAPER,outline='#D1D4CB',width=1)
    text(x+24,211,'9:41',13,INK,True);text(x+302,211,'•••',13); d.rounded_rectangle((x+341,216,x+361,225),radius=2,outline=INK,width=1); d.rectangle((x+344,218,x+356,223),fill=INK)
    text(x+24,255,'‹' if back else 'mingpal',25 if back else 15,INK,True)
    text(x+24,304,title,25,INK,True)
    d.rounded_rectangle((x+140,1015,x+250,1020),radius=3,fill='#252720')
def nav(x):
    rule(x+24,950);text(x+35,974,'우편함',15,INK,True);text(x+151,974,'친구 찾기',15,MUTED);text(x+283,974,'내 공간',15,MUTED)
def person(x,y,name,country,preview,state='',initial='M'):
    d.ellipse((x,y+4,x+42,y+46),fill='#E3E6DC');text(x+13,y+12,initial,17,MUTED,True)
    text(x+58,y,name,18,INK,True);text(x+58,y+31,country,13,MUTED)
    wrapped(x+58,y+60,preview,275,15,MUTED,25)
    if state:text(x+58,y+123,state,13,INK,True)
    rule(x,y+164)
def canvas(w,title,sub):
    global im,d
    im=Image.new('RGB',(w,1120),BG);d=ImageDraw.Draw(im)
    text(40,27,'MINGPAL / DESIGN STUDY 01',14,MUTED,True)
    text(40,58,title,31,INK,True);text(40,108,sub,16,MUTED)

canvas(2190,'일상을 읽고, 내 말로 답하는 편지','핵심 흐름 · 390px 기준 · 가상 콘텐츠 · 정적 시안 — 전송·저장 기능은 구현하지 않음')
xs=[40,470,900,1330,1760]
for x,label,title,back in zip(xs,['01 / 우편함','02 / 친구별 기록','03 / 편지 읽기','04 / 편지 작성','05 / 전송 확인'],['우편함','Maya와의 편지','Maya의 편지','답장 쓰기','보내기 전 확인'],[False,True,True,True,True]):shell(x,label,title,back)
x=xs[0];text(x+24,352,'서로의 일상이 쌓이는 곳',15,MUTED)
d.rounded_rectangle((x+24,398,x+366,463),radius=13,fill='white');text(x+40,419,'첫 편지  2',16,INK,True);text(x+228,419,'초안  1  ›',16)
text(x+24,492,'친구',14,MUTED,True)
person(x+24,530,'Maya','캐나다 · 오늘','I took the long way to the bakery…','새 편지 2  ·  작성 중')
person(x+24,716,'Daniel','영국 · 10월 25일','Thank you for sharing your story.','', 'D');text(x+24,910,'보관한 교류  ›',14,MUTED);nav(x)
x=xs[1];text(x+24,351,'캐나다  ·  소개 보기 ›',14,MUTED)
d.rounded_rectangle((x+24,399,x+366,485),radius=13,fill='white');text(x+40,415,'작성 중인 편지',16,INK,True);text(x+40,447,'계정에 저장됨',13,MUTED);text(x+271,432,'이어 쓰기',14,INK,True)
for y,who,date,body,new in [(520,'Maya','오늘','Is there a small routine that makes you feel at home?',True),(659,'Maya','10월 26일','I forgot to tell you about the little bakery near my apartment.',True),(798,'나','10월 24일','Last Sunday, I cooked with my family.',False)]:
    text(x+24,y,who,17,INK,True);text(x+270,y,date,13,MUTED)
    if new:text(x+88,y+2,'새 편지',12,INK,True)
    wrapped(x+24,y+34,body,330,16,MUTED,25);rule(x+24,y+119)
button(x+24,945,'이어 쓰기')
letter='Hi Min,\nYou asked what I usually do on Sunday mornings. Last weekend, I took the long way to the bakery near my apartment. It had rained all night, and the streets were still quiet.\nI bought a loaf of bread and sat by the window for a while, watching people hurry past with their umbrellas.\nIs there a small routine that makes you feel at home? I would love to hear about an ordinary part of your week.\nTake care,\nMaya'
x=xs[2];text(x+24,352,'Maya → 나  ·  10월 28일',13,MUTED);rule(x+24,388);wrapped(x+24,408,letter,342,17,INK,27);button(x+24,945,'이어 쓰기')
reply='Hi Maya,\nYour quiet morning at the bakery sounds lovely. My small routine is making tea after everyone has gone to bed.\nI leave my phone in another room and sit by the window for a few minutes. Sometimes I read, but usually I just enjoy the quiet.\nLast Sunday, my daughter helped me cook dinner. We made a mess, but it was the best part of my weekend.\nDo you have a favourite kind of bread?\nMin'
x=xs[3];text(x+24,352,'받는 사람  Maya',15,INK,True);text(x+24,389,'받은 편지 보기  ↗',14,MUTED);rule(x+24,426)
wrapped(x+24,448,reply,342,17,INK,27);text(x+24,862,'계정에 저장됨',13,MUTED);text(x+24,906,'영어 도움  +',15,INK,True);button(x+24,945,'보내기 전 확인')
x=xs[4];text(x+24,352,'받는 사람  Maya',15,INK,True);rule(x+24,392);wrapped(x+24,416,reply,342,17,INK,27)
text(x+24,858,'보낸 편지는 수정하거나 회수할 수 없어요.',13,MUTED);text(x+157,906,'수정하기',15,INK,True);button(x+24,945,'보내기')
im.save(OUT/'mingpal-core.png')

canvas(1330,'평소와 다른 상태도, 같은 언어로','첫 편지 요청 · 빈 우편함 · 저장 실패 — 별도 수락 버튼 없이 답장으로 교류 시작')
for x,label,title in [(40,'06 / 받은 첫 편지','첫 편지'),(470,'07 / 빈 우편함','우편함'),(900,'08 / 저장 실패','답장 쓰기')]:shell(x,label,title)
x=40;text(x+24,360,'받은 편지  2',16,INK,True);text(x+219,360,'보낸 편지',16,MUTED);rule(x+24,399)
person(x+24,430,'Sofia','포르투갈 · 오늘','I saw that you enjoy cooking. I have been learning to bake…','새 편지','S')
person(x+24,619,'Alex','호주 · 어제','What does an ordinary weekend look like for you?','새 편지','A')
wrapped(x+24,834,'답장을 보내면 교류가 시작돼요.\n지금 답하지 않아도 괜찮아요.',342,15,MUTED,26);text(x+24,960,'정리한 요청  ›',14,MUTED)
x=470;text(x+24,360,'첫 편지  0',15,MUTED);text(x+250,360,'초안  0',15,MUTED);rule(x+24,399)
text(x+24,535,'아직 주고받은 편지가 없어요',22,INK,True);wrapped(x+24,590,'어떤 일상을 보내는 사람인지 읽어보고,\n궁금한 이야기를 건네보세요.',342,16,MUTED,29);button(x+24,710,'친구 찾기');nav(x)
x=900;text(x+24,352,'받는 사람  Maya',15,INK,True);text(x+24,389,'받은 편지 보기  ↗',14,MUTED);rule(x+24,426);wrapped(x+24,448,reply.split('Last Sunday')[0].rstrip(),342,17,INK,27)
d.rounded_rectangle((x+24,744,x+366,921),radius=12,fill='#F0E9E3');text(x+40,762,'계정에 저장하지 못했어요',17,INK,True);wrapped(x+40,797,'이 기기에는 저장됐어요.\n연결을 확인하고 다시 시도해 주세요.',310,14,MUTED,24);text(x+40,877,'계정 저장 재시도',14,INK,True)
button(x+24,945,'보내기 전 확인')
im.save(OUT/'mingpal-states.png')

