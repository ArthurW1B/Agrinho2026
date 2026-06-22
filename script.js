// Aguarda todo o HTML da página carregar antes de executar o JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
    // ==========================================
    const cards = document.querySelectorAll('.card');
    
    // Configura o observador para detectar quando os cards aparecem na tela
    const observerOptions = {
        root: null,
        threshold: 0.1, // Ativa quando 10% do card estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona o efeito visual de surgir
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    // Prepara os cards para a animação inicializando-os como invisíveis
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });


    // ==========================================
    // 2. BOTÃO CRIAÇÃO AUTOMÁTICA DE "VOLTAR AO TOPO"
    // ==========================================
    const topoBtn = document.createElement('button');
    topoBtn.innerHTML = '▲';
    topoBtn.setAttribute('title', 'Voltar ao topo');
    
    // Estilização do botão via JavaScript para manter o CSS limpo
    Object.assign(topoBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        zIndex: '2000',
        transition: 'background-color 0.3s'
    });

    // Efeito de hover no botão do topo
    topoBtn.addEventListener('mouseover', () => topoBtn.style.backgroundColor = '#2e5c31');
    topoBtn.addEventListener('mouseout', () => topoBtn.style.backgroundColor = '#4CAF50');

    document.body.appendChild(topoBtn);

    // Monitora a rolagem da página para mostrar/esconder o botão
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topoBtn.style.display = 'block';
        } else {
            topoBtn.style.display = 'none';
        }
    });

    // Evento de clique para subir suavemente
    topoBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ==========================================
    // 3. CLIQUES INTERATIVOS NOS CARDS (DICAS EXTRAS)
    // ==========================================
    // Banco de dados simples com informações extras sobre cada prática ABC
    const dicasExtras = {
        "Sistema Plantio Direto (SPD)": "💡 Curiosidade: O SPD pode reduzir o uso de combustível dos tratores em até 50%, já que o agricultor mexe muito menos no solo!",
        "Integração Lavoura-Pecuária-Floresta (ILPF)": "💡 Curiosidade: A sombra das árvores no sistema ILPF reduz o estresse térmico do gado, aumentando a produção de leite e carne.",
        "Recuperação de Pastagens Degradadas": "💡 Curiosidade: Recuperar uma pastagem evita que o produtor precise desmatar novas florestas para expandir seu negócio.",
        "Fixação Biológica de Nitrogênio (FBN)": "💡 Curiosidade: O Brasil poupa bilhões de dólares anualmente na cultura da soja graças ao uso dessas bactérias naturais!"
    };

    cards.forEach(card => {
        // Transforma o cursor em uma "mãozinha" para indicar que é clicável
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            const tituloCard = card.querySelector('h4').innerText;
            const dica = dicasExtras[tituloCard];
            
            if (dica) {
                // Exibe um alerta personalizado na tela
                alert(`--- ${tituloCard} ---\n\n${dica}`);
            }
        });
    });
});