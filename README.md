# Relatório Técnico de Manutenção (TechMaintain)

Sistema profissional para geração e visualização de relatórios técnicos de manutenção de hardware (Consoles, PCs e Eletrônicos), com foco em transparência e experiência do cliente.

![Preview do Projeto](https://via.placeholder.com/1200x600?text=TechMaintain+Preview)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido para substituir relatórios de papel ou PDFs estáticos. Ele gera uma página web interativa onde o cliente pode ver:
- Detalhes técnicos do serviço.
- Comparativos de performance (ex: Condutividade Térmica).
- Galeria de fotos de alta resolução com Zoom (Lightbox) para conferir soldas e limpezas.
- Monitoramento em tempo real do prazo de garantia.

## 🚀 Funcionalidades Principais

- **Galeria Deep Zoom**: Permite ao cliente ampliar fotos da placa mãe para ver detalhes microscópicos do serviço.
- **Exportação JPG (Ofício)**: Gera uma imagem de alta resolução de todo o relatório para arquivamento ou envio via WhatsApp.
- **Monitor de Garantia**: Painel visual que calcula dias restantes, mostrando alertas de vencimento (Ativo/Atenção/Expirado).
- **QR Code Integrado**: Gera automaticamente um QR Code para acesso rápido via celular.
- **Painel de Automação (Simulado)**: Interface visual que demonstra como o sistema envia e-mails de lembrete automáticos.

## 🛠️ Tecnologias

- **React 18** + **TypeScript**: Core da aplicação.
- **Vite**: Build tool rápida.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Lucide React**: Ícones vetoriais.
- **Recharts**: Gráficos técnicos.
- **html2canvas**: Engine de captura de tela para exportação do relatório.

## 📦 Como Instalar e Rodar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SEU-USUARIO/techmaintain-report.git
   cd techmaintain-report
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Rode o projeto**
   ```bash
   npm run dev
   ```
   O projeto abrirá em `http://localhost:5173`.

## ⚙️ Configuração

Para alterar os dados do relatório (Cliente, Técnico, Imagens), edite o arquivo `src/App.tsx` nas constantes iniciais:

```typescript
const serviceInfo = { ... }
const provider = { ... }
const client = { ... }
```

## 📄 Licença

Este projeto é de uso livre para fins educacionais e profissionais.
