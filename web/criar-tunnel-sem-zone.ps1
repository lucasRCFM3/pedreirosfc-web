# Script alternativo para criar tunnel sem precisar de zone inicialmente
# Este script tenta criar o tunnel de forma diferente

# Adiciona o cloudflared ao PATH
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"

$TUNNEL_NAME = "astryx"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Criando Tunnel Permanente (Sem Zone)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Este metodo tenta criar o tunnel sem precisar autorizar uma zone inicialmente."
Write-Host "Mas para URL 100% fixa, voce ainda precisara de um dominio depois." -ForegroundColor Yellow
Write-Host ""

# Verifica se o cloudflared está instalado
try {
    $cloudflared = Get-Command cloudflared -ErrorAction Stop
    Write-Host "[OK] Cloudflare Tunnel encontrado!" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Cloudflare Tunnel nao encontrado!" -ForegroundColor Red
    Write-Host "Instale com: winget install --id Cloudflare.cloudflared" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Yellow
Write-Host "IMPORTANTE: Para URL 100% fixa, voce PRECISA de um dominio!" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opcoes:" -ForegroundColor Cyan
Write-Host "1. Usar dominio gratuito (Freenom: .tk, .ml, .ga)" -ForegroundColor White
Write-Host "2. Usar dominio pago (.com, .net, etc.)" -ForegroundColor White
Write-Host "3. Tentar criar tunnel sem dominio (URL nao sera 100% fixa)" -ForegroundColor White
Write-Host ""
Write-Host "Para opcoes 1 e 2, veja o guia: URL_100_PORCENTO_FIXA.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deseja continuar mesmo sem dominio? (S/N)" -ForegroundColor Yellow
$continuar = Read-Host

if ($continuar -ne "S" -and $continuar -ne "s") {
    Write-Host ""
    Write-Host "Veja o guia URL_100_PORCENTO_FIXA.md para configurar um dominio." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 0
}

Write-Host ""
Write-Host "Tentando criar tunnel sem autorizacao de zone..." -ForegroundColor Yellow
Write-Host ""
Write-Host "NOTA: Isso pode nao funcionar. O Cloudflare geralmente requer" -ForegroundColor Yellow
Write-Host "uma zone para autorizar o tunnel." -ForegroundColor Yellow
Write-Host ""

# Tenta criar o tunnel diretamente
Write-Host "Criando tunnel: $TUNNEL_NAME" -ForegroundColor Cyan
cloudflared tunnel create $TUNNEL_NAME

Write-Host ""
Write-Host "Se deu erro sobre autorizacao, voce PRECISA:" -ForegroundColor Red
Write-Host "1. Pegar um dominio gratuito (ex: no Freenom)" -ForegroundColor Yellow
Write-Host "2. Adicionar no Cloudflare (Add a Site)" -ForegroundColor Yellow
Write-Host "3. Depois rodar: .\criar-tunnel-permanente.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "Veja o guia completo: URL_100_PORCENTO_FIXA.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

