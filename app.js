const state = {
    objects: [],
    angle: 0,
};

const seesawPlank = document.getElementById('seesaw-plank');

function render() {
    // Önceki ağırlıkları temizle
    seesawPlank.querySelectorAll('.weight').forEach(w => w.remove());
    
    state.objects.forEach(item => {
        const weightElement = document.createElement('div');
        weightElement.className = 'weight';
        weightElement.textContent = item.weight;
        weightElement.style.position = 'absolute';
        
        weightElement.style.background = 'red';
        weightElement.style.width = '30px';
        weightElement.style.height = '30px';
        weightElement.style.borderRadius = '50%';
        weightElement.style.top = '-30px';
        
        const plankCenter = seesawPlank.offsetWidth / 2;
        let leftPos = (item.side === 'left')
            ? plankCenter - item.distance - 15
            : plankCenter + item.distance - 15;
        
        weightElement.style.left = `${leftPos}px`;
        seesawPlank.appendChild(weightElement);
    });
    
    // Tahterevalliyi döndür
    seesawPlank.style.transform = `translateY(-50%) rotate(${state.angle}deg)`;
}

function calculateSeesawState() {
    let leftTorque = 0;
    let rightTorque = 0;
    
    state.objects.forEach(item => {
        const torque = item.weight * item.distance;
        if (item.side === 'left') {
            leftTorque += torque;
        } else {
            rightTorque += torque;
        }
    });
    
    // Tork farkına göre açıyı hesapla, max ±30 derece
    let angle = (rightTorque - leftTorque) / 10;
    state.angle = Math.max(-30, Math.min(30, angle));
}

seesawPlank.addEventListener('click', (e) => {
    const rect = seesawPlank.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    const centerX = seesawPlank.offsetWidth / 2;
    
    const newWeight = {
        weight: Math.floor(Math.random() * 10) + 1,
        distance: Math.abs(clickX - centerX),
        side: clickX < centerX ? 'left' : 'right',
    };

    state.objects.push(newWeight);
    calculateSeesawState();
    render();
    console.log(state);
});