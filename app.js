const state = {
    objects: [],
    angle: 0,
    totalLeftWeight: 0,
    totalRightWeight: 0,
    nextWeight: Math.floor(Math.random() * 10) + 1
};

const seesawPlank = document.getElementById('seesaw-plank');

function render() {
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
    
    seesawPlank.style.transform = `translate(-50%, -50%) rotate(${state.angle}deg)`;
    
    // Bilgi panellerini güncelle
    document.getElementById('left-weight-value').textContent = `${state.totalLeftWeight.toFixed(1)} kg`;
    document.getElementById('right-weight-value').textContent = `${state.totalRightWeight.toFixed(1)} kg`;
    document.getElementById('next-weight-value').textContent = `${state.nextWeight}.0 kg`;
    document.getElementById('tilt-angle-value').textContent = `${state.angle.toFixed(1)}°`;
}

function calculateSeesawState() {
    let leftTorque = 0, rightTorque = 0;
    let totalLeftWeight = 0, totalRightWeight = 0;
    
    state.objects.forEach(item => {
        const torque = item.weight * item.distance;
        if (item.side === 'left') {
            leftTorque += torque;
            totalLeftWeight += item.weight;
        } else {
            rightTorque += torque;
            totalRightWeight += item.weight;    
        }
    });
    
    state.totalLeftWeight = totalLeftWeight;
    state.totalRightWeight = totalRightWeight;
    
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
});

// Sayfa ilk yüklendiğinde panellerin doğru değeri göstermesi için
render();