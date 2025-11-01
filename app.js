const state = {
    objects: [],
    angle: 0,
};

const seesawPlank = document.getElementById('seesaw-plank');

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
    console.log(state); // State'in güncellendiğini görmek için
});