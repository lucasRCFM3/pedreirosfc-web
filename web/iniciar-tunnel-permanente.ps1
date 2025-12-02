# Script para iniciar o Cloudflare Tunnel Permanente
# Uso: .\iniciar-tunnel-permanente.ps1
#
# IMPORTANTE: Voce precisa ter configurado o tunel permanente antes!
# Siga o guia em: TUNEL_PERMANENTE.md

# Configuração de tratamento de erro
$ErrorActionPreference = "Continue"
trap {
    Write-Host ""
    Write-Host "[ERRO] Erro inesperado ocorreu!" -ForegroundColor Red
    Write-Host "Erro: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Adiciona o cloudflared ao PATH
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"

# Nome do túnel (pode mudar se você criou com outro nome)
$TUNNEL_NAME = "pedreirosfc"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Iniciando Cloudflare Tunnel Permanente..." -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Nome do tunel: $TUNNEL_NAME" -ForegroundColor Yellow
Write-Host ""

# Verifica se o cloudflared está disponível
try {
    $cloudflared = Get-Command cloudflared -ErrorAction Stop
    Write-Host "[OK] Cloudflare Tunnel encontrado!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Conectando ao tunel permanente..." -ForegroundColor Yellow
    Write-Host "Aguarde alguns segundos para a URL aparecer..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "[DICA] Certifique-se que o servidor Next.js esta rodando em http://localhost:3000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "[AVISO] Para parar o tunel, pressione Ctrl+C" -ForegroundColor Yellow
    Write-Host ""
    
    # Tenta iniciar o tunnel permanente
    try {
        cloudflared tunnel run $TUNNEL_NAME
    } catch {
        Write-Host ""
        Write-Host "[ERRO] Erro ao iniciar o tunel!" -ForegroundColor Red
        Write-Host "Erro: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Possiveis causas:" -ForegroundColor Yellow
        Write-Host "   - Tunel '$TUNNEL_NAME' nao foi criado ainda" -ForegroundColor Gray
        Write-Host "   - Execute primeiro: .\criar-tunnel-permanente.ps1" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
} catch {
    Write-Host "[ERRO] Cloudflare Tunnel nao encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Para instalar, rode:" -ForegroundColor Yellow
    Write-Host "winget install --id Cloudflare.cloudflared" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ou use o caminho completo:" -ForegroundColor Yellow
    Write-Host "& '$env:LOCALAPPDATA\Microsoft\WinGet\Links\cloudflared.exe' tunnel run $TUNNEL_NAME" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para configurar o tunel permanente, veja: TUNEL_PERMANENTE.md" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Erro detalhado: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
