//     <!-- для калькулятора -->
//анимация svg
const object = {
    11: 63,
    10: 110,
    9: 160,
    8: 200,
    7: 225,
    6: 255,
    5: 300,
    4: 315,
    3: 355,
    2: 400,
    1: 450,
    0: 500
}
const circuls = document.querySelectorAll('.calculator__circul');
const numbers = document.querySelectorAll('.calculator__numbers');
// стоимость за единицу глубины
const table = document.querySelector('.price__inner');
const result = document.querySelector('[data-calc]');
let flag = true;
const perDepth = Array.from(table.children);

const diametr = {};

// Функция для извлечения первого числа
function extractFirstNumber(s) {
    const match = s.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
}

// Функция для извлечения второго числа (с учетом возможных пробелов)
function extractSecondNumber(s) {
    const parts = s.split('—');
    if (parts.length > 1) {
        const match = parts[1].match(/[\d\s]+/);
        return match ? parseInt(match[0].replace(/\s+/g, ''), 10) : null;
    }
    return null;
}

perDepth.forEach(element => {
    // Извлекаем первое число
    const size = extractFirstNumber(element.textContent);

    // Извлекаем второе число
    const price = extractSecondNumber(element.textContent);
    diametr[size] = price;
});

if (diametr.length < 1) {
    alert('калькулятор не может работать без данных');
    flag = false;
}
if (flag) {
    const fieldDiametr = document.querySelector('[data-diametr]');
    circuls.forEach((circul, index) => {
        circul.addEventListener('click', () => {

            circuls.forEach(circul => circul.classList.remove('active'));
            numbers.forEach(number => number.classList.remove('active'));

            circul.classList.add('active');
            numbers[index].classList.add('active');
            showOnSvg(numbers[index]);
        });
    });
    // input range - калькулятор 

    // Получаем элементы DOM
    const numberInput = document.getElementById('numberInput');
    const rangeInput = document.getElementById('rangeInput');


    rangeInput.addEventListener('change', () => {
        numberInput.value = rangeInput.value;
        const currentDiamet = document.querySelector('[data-diametr]').textContent;
        result.textContent = numberInput.value * parseInt(diametr[currentDiamet]);
    })

    numberInput.addEventListener('input', () => {
        rangeInput.value = numberInput.value;
        const currentDiamet = document.querySelector('[data-diametr]').textContent;
        result.textContent = rangeInput.value * parseInt(diametr[currentDiamet]);
    })

    function showOnSvg(element) {
        let circulNumber = element.dataset.number;
        // numberInput.value = object[circulNumber];
        // rangeInput.value = object[circulNumber];
        fieldDiametr.textContent = object[circulNumber];
        const currentDiamet = document.querySelector('[data-diametr]').textContent;
        result.textContent = rangeInput.value * parseInt(diametr[currentDiamet]);
    }
}

//прокрутка - свайпы изображений вбок
function toggleAccordion(header) {
    var content = header.nextElementSibling;
    let container = header.closest('.accordion');
    var icon = header.querySelector('.accordion-icon');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    icon.classList.toggle('active');
    container.classList.toggle('active');
}
const swipeContainer = document.getElementById('swipeContainer');
let startX, currentX;

swipeContainer.addEventListener('mousedown', startSwipe);
swipeContainer.addEventListener('touchstart', startSwipe);

function startSwipe(event) {
    event.preventDefault();
    startX = event.clientX || event.touches[0].clientX;
    swipeContainer.addEventListener('mousemove', swipe);
    swipeContainer.addEventListener('touchmove', swipe);
    swipeContainer.addEventListener('mouseup', endSwipe);
    swipeContainer.addEventListener('touchend', endSwipe);
}

function swipe(event) {
    currentX = event.clientX || event.touches[0].clientX;
    const diffX = currentX - startX;
    swipeContainer.style.transform = `translateX(calc(-50% + ${diffX}px))`;
}

function endSwipe() {
    swipeContainer.removeEventListener('mousemove', swipe);
    swipeContainer.removeEventListener('touchmove', swipe);
    swipeContainer.removeEventListener('mouseup', endSwipe);
    swipeContainer.removeEventListener('touchend', endSwipe);
}