const COLOR_PALETTE = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22'];

const state = {
    objects: [],
    angle: 0,
    totalLeftWeight: 0,
    totalRightWeight: 0,
    nextWeight: Math.floor(Math.random() * 10) + 1
};

const seesawPlank = document.getElementById('seesaw-plank');
const weightPreview = document.getElementById('weight-preview');
const previewLine = document.getElementById('preview-line');
const simulationContainer = document.getElementById('simulation-container');
const HOVER_OFFSET_Y = 120;

function render() {
    seesawPlank.querySelectorAll('.weight').forEach(w => w.remove());
    
    state.objects.forEach(item => {
        const weightElement = document.createElement('div');
        weightElement.className = 'weight';
        weightElement.textContent = item.weight;
        weightElement.style.position = 'absolute';
        
        weightElement.style.background = item.color;
        weightElement.style.width = `${item.size}px`;
        weightElement.style.height = `${item.size}px`;
        weightElement.style.borderRadius = '50%';
        weightElement.style.fontSize = `${Math.max(10, item.size * 0.25)}px`;
        weightElement.style.top = `-${item.size / 2 + seesawPlank.offsetHeight / 2}px`;
        
        const plankCenter = seesawPlank.offsetWidth / 2;
        let leftPos = (item.side === 'left')
            ? plankCenter - item.distance - (item.size / 2)
            : plankCenter + item.distance - (item.size / 2);
        
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
            // Tork hatası burada düzeltildi
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
        weight: state.nextWeight,
        distance: Math.round(Math.abs(clickX - centerX)),
        side: clickX < centerX ? 'left' : 'right',
        color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
        size: 30 + state.nextWeight * 3
    };
    
    const fallingWeight = document.createElement('div');
    fallingWeight.className = 'falling-weight weight';
    fallingWeight.textContent = newWeight.weight;
    fallingWeight.style.width = `${newWeight.size}px`;
    fallingWeight.style.height = `${newWeight.size}px`;
    fallingWeight.style.backgroundColor = newWeight.color;
    fallingWeight.style.borderRadius = '50%';
    fallingWeight.style.fontSize = `${Math.max(10, newWeight.size * 0.25)}px`;
    
    const startX = e.clientX;
    const endY = e.clientY;
    const startY = endY - HOVER_OFFSET_Y;
    
    fallingWeight.style.left = `${startX - (newWeight.size / 2)}px`;
    fallingWeight.style.top = `${startY - (newWeight.size / 2)}px`;
    document.body.appendChild(fallingWeight);

    setTimeout(() => {
        fallingWeight.style.top = `${endY - (newWeight.size / 2)}px`;
    }, 10);
    
    fallingWeight.addEventListener('transitionend', () => {
        fallingWeight.remove();
        state.objects.push(newWeight);
        state.nextWeight = Math.floor(Math.random() * 10) + 1;
        calculateSeesawState();
        render();
    }, { once: true });
});

seesawPlank.addEventListener('mouseenter', () => {
    weightPreview.style.display = 'flex';
    previewLine.style.display = 'block';
});

seesawPlank.addEventListener('mouseleave', () => {
    weightPreview.style.display = 'none';
    previewLine.style.display = 'none';
});

seesawPlank.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const size = 30 + state.nextWeight * 3;
    weightPreview.style.width = `${size}px`;
    weightPreview.style.height = `${size}px`;
    weightPreview.textContent = `${state.nextWeight}kg`;
    
    weightPreview.style.left = `${x - size / 2}px`;
    weightPreview.style.top = `${y - HOVER_OFFSET_Y - size / 2}px`;
    
    previewLine.style.left = `${x}px`;
    previewLine.style.top = `${y - HOVER_OFFSET_Y}px`;
    previewLine.style.height = `${HOVER_OFFSET_Y}px`;
});

// Sayfa ilk yüklendiğinde panellerin doğru değeri göstermesi için
render();