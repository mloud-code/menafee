// ===== script.js =====
const sampleArticles = [
{title: 'مناجم شمال موريتانيا: تحديث الشحنات الشهرية',excerpt: 'شهدت موانئ التصدير زيادة في شحنات الحديد بنسبة 8% مقارنة بالشهر الماضي.',date: '2025-09-09'},
{title: 'اسنيم تؤكد ان  انتاج شركتا. العوج وتكامل سيتجاوز  سنويا اكثر من 20 مليون طن من الحديد',excerpt: '',date: '2025-09-06'},
{title: 'نجاح ملحوظ في ختام مؤتمر  موريتانيد للطاقة والمعادن',excerpt: '',date: '2025-08-30'}
];


function renderArticles(){
const container = document.getElementById('articles');
container.innerHTML = '';
sampleArticles.forEach(a => {
const card = document.createElement('article');
card.className = 'card';
card.innerHTML = `\n <h3>${a.title}</h3>\n <p class="muted">${a.date}</p>\n <p>${a.excerpt}</p>\n <a href="#" class="read-more">اقرأ المزيد</a>`;
container.appendChild(card);
});
}
renderArticles();
document.getElementById('year').textContent = new Date().getFullYear();


const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', function(e){
e.preventDefault();
const name = form.name.value.trim();
const email = form.email.value.trim();
const topic = form.topic.value;
const message = form.message.value.trim();
if(!name || !email || !message){
feedback.textContent = 'الرجاء ملء الحقول المطلوبة.';
return;
}
const submission = {name,email,topic,message,date:new Date().toISOString()};
saveSubmissionLocally(submission);
feedback.textContent = 'تم الإرسال بنجاح. شكرًا لمساهمتك!';
form.reset();
});


function saveSubmissionLocally(obj){
const arr = JSON.parse(localStorage.getItem('submissions') || '[]');
arr.push(obj);
localStorage.setItem('submissions', JSON.stringify(arr));
}


document.getElementById('saveLocal').addEventListener('click', function(){
const name = form.name.value.trim() || 'غير مُسجل';
const email = form.email.value.trim() || 'غير مُسجل';
const topic = form.topic.value;
const message = form.message.value.trim() || '';
const text = `الاسم: ${name}\nالبريد: ${email}\nالموضوع: ${topic}\nالرسالة:\n${message}`;
const blob = new Blob([text], {type:'text/plain'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `contact_${Date.now()}.txt`;
document.body.appendChild(a);
a.click();
a.remove();
URL.revokeObjectURL(url);
});


document.addEventListener('click', function(e){
if(e.target.classList.contains('read-more')){
e.preventDefault();
alert('وضع تجريبي: سيؤدي هذا إلى فتح المقال الكامل لاحقاً.');
}
});