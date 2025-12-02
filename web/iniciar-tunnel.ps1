# Script para iniciar o Cloudflare Tunnel
# Uso: .\iniciar-tunnel.ps1

# Adiciona o cloudflared ao PATH
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"

# Verifica se o cloudflared está disponível
try {
    $cloudflared = Get-Command cloudflared -ErrorAction Stop
    Write-Host "✅ Cloudflare Tunnel encontrado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Iniciando tunnel para http://localhost:3000..." -ForegroundColor Cyan
    Write-Host "⏳ Aguarde alguns segundos..." -ForegroundColor Yellow
    Write-Host ""
    
    # Inicia o tunnel
    cloudflared tunnel --url http://localhost:3000
} catch {
    Write-Host "❌ Cloudflare Tunnel não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Para instalar, rode:" -ForegroundColor Yellow
    Write-Host "winget install --id Cloudflare.cloudflared" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ou use o caminho completo:" -ForegroundColor Yellow
    Write-Host "& '$env:LOCALAPPDATA\Microsoft\WinGet\Links\cloudflared.exe' tunnel --url http://localhost:3000" -ForegroundColor Cyan
}

