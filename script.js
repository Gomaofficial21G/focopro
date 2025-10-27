// script.js - Apenas a função showDetails modificada. O resto do arquivo permanece igual.

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const modal = document.getElementById('details-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalDayTitle = document.getElementById('modal-day-title');
    const modalBody = document.getElementById('modal-body');
    const modalContent = document.querySelector('.modal-content'); // Para a cor da borda

    // Mapeamento de Fases (descrição e classe CSS) - Permanece igual
    const phases = [
        { limit: 7, desc: "A Dor", class: "phase-1", color: "var(--phase1-color)" },
        { limit: 15, desc: "A Revelação", class: "phase-2", color: "var(--phase2-color)" },
        { limit: 23, desc: "O Sistema", class: "phase-3", color: "var(--phase3-color)" },
        { limit: 30, desc: "A Transformação", class: "phase-4", color: "var(--phase4-color)" }
    ];

    // Função para obter informações da fase baseada no número do dia - Permanece igual
    function getPhaseInfo(dayNumber) {
        for (const phase of phases) {
            if (dayNumber <= phase.limit) {
                return phase;
            }
        }
        return phases[phases.length - 1]; // Retorna a última fase por padrão
    }

    if (calendarGrid && reelData && modal) {
        // Gera os dias do calendário - Lógica permanece a mesma
        for (let i = 0; i < 30; i++) {
            const dayNumber = i + 1;
            const phaseInfo = getPhaseInfo(dayNumber);

            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day', phaseInfo.class);
            dayDiv.dataset.index = i; // Guarda o índice para buscar dados depois

            dayDiv.innerHTML = `
                <div class="day-number">${dayNumber}</div>
                <div class="day-phase-desc">${phaseInfo.desc}</div>
            `;

            // Adiciona o listener de clique para abrir o modal - Lógica permanece a mesma
            dayDiv.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                showDetails(index);
            });

            calendarGrid.appendChild(dayDiv);
        }

        // --- MODIFICAÇÃO PRINCIPAL AQUI ---
        // Função para mostrar os detalhes no modal
        function showDetails(index) {
            const data = reelData[index];
            const dayNumber = index + 1;
            const phaseInfo = getPhaseInfo(dayNumber);

            if (data) {
                modalDayTitle.textContent = `Dia ${dayNumber} - ${phaseInfo.desc}`;

                // Atualiza o innerHTML para incluir as três variações de prospecção
                modalBody.innerHTML = `
                    <div class="reel-section" style="border-left-color: ${phaseInfo.color};">
                        <strong>🎬 Reel do Dia:</strong>
                        <p class="reel-title">${data.title || 'N/A'}</p>
                        <p class="reel-details"><em>Gancho:</em> ${data.gancho || '-'}<br><em>Estrutura:</em> ${data.estrutura || '-'}</p>
                        <p class="reel-cta"><strong>CTA:</strong> ${data.cta || '-'}</p>
                        <p class="reel-caption"><em>Legenda:</em> ${data.legenda || '-'}</p>
                    </div>
                    <div class="prospect-section">
                        <strong>🎯 Prospecção do Dia:</strong>
                        <p class="prospect-task prospect-auto"><strong>Automação (n8n):</strong> ${data.prospect_auto || 'Tarefa não definida.'}</p>
                        <p class="prospect-task prospect-trafego"><strong>Tráfego Pago:</strong> ${data.prospect_trafego || 'Tarefa não definida.'}</p>
                        <p class="prospect-task prospect-combo"><strong>n8n + Tráfego:</strong> ${data.prospect_combo || 'Tarefa não definida.'}</p>
                    </div>
                `;
                // --- FIM DA MODIFICAÇÃO NO INNERHTML ---

                // Atualiza a cor da borda do modal content - Lógica permanece a mesma
                modalContent.style.borderTopColor = phaseInfo.color;

                modal.classList.add('modal-show'); // Mostra o modal
            } else {
                console.error(`Dados para o dia ${dayNumber} não encontrados.`);
            }
        }
        // --- FIM DA MODIFICAÇÃO NA FUNÇÃO showDetails ---

        // Função para fechar o modal - Permanece igual
        function hideDetails() {
            modal.classList.remove('modal-show');
        }

        // Event listeners para fechar o modal - Permanece igual
        modalCloseBtn.addEventListener('click', hideDetails);
        modal.addEventListener('click', function(event) {
            // Fecha se clicar no overlay (fora do conteúdo)
            if (event.target === modal) {
                hideDetails();
            }
        });

    } else {
        console.error("Elementos essenciais (grid, dados, modal) não encontrados.");
    }
});