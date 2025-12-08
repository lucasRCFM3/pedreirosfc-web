# Script para configurar o Cloudflare Tunnel Permanente
# Uso: .\criar-tunnel-permanente.ps1
#
# Este script vai te guiar passo a passo na configuração

# Configuração de tratamento de erro
$ErrorActionPreference = "Continue"
trap {
    Write-Host ""
    Write-Host "[ERRO] Erro inesperado ocorreu!" -ForegroundColor Red
    Write-Host "Erro: $_" -ForegroundColor Red
    Write-Host "Linha: $($_.InvocationInfo.ScriptLineNumber)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Adiciona o cloudflared ao PATH
$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"

$TUNNEL_NAME = "astryx"
$CLOUDFLARED_DIR = "$env:USERPROFILE\.cloudflared"
$CONFIG_FILE = "$CLOUDFLARED_DIR\config.yml"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Configuracao do Cloudflare Tunnel Permanente" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Passo 1: Verificar se cloudflared está instalado
Write-Host "[PASSO 1] Verificando Cloudflare Tunnel..." -ForegroundColor Yellow
try {
    $cloudflared = Get-Command cloudflared -ErrorAction Stop
    $version = (cloudflared --version) -split "`n" | Select-Object -First 1
    Write-Host "[OK] Cloudflare Tunnel encontrado: $version" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Cloudflare Tunnel nao encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Para instalar, rode:" -ForegroundColor Yellow
    Write-Host "winget install --id Cloudflare.cloudflared" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Erro detalhado: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""
Write-Host "[PASSO 2] Fazendo login no Cloudflare..." -ForegroundColor Yellow
Write-Host "Isso vai abrir seu navegador..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione qualquer tecla para continuar (ou Ctrl+C para cancelar)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Faz login
Write-Host ""
Write-Host "Abrindo navegador para login..." -ForegroundColor Cyan
cloudflared tunnel login

Write-Host ""
Write-Host "Login concluido? (S/N)" -ForegroundColor Yellow
$loginOk = Read-Host

if ($loginOk -ne "S" -and $loginOk -ne "s") {
    Write-Host "[ERRO] Login nao concluido. Saindo..." -ForegroundColor Red
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""
Write-Host "[PASSO 3] Criando tunel permanente..." -ForegroundColor Yellow
Write-Host "Nome do tunel: $TUNNEL_NAME" -ForegroundColor Cyan
Write-Host ""

# Cria o túnel
cloudflared tunnel create $TUNNEL_NAME

Write-Host ""
Write-Host "[OK] Tunel criado com sucesso!" -ForegroundColor Green
Write-Host ""

Write-Host "[PASSO 4] Configurando arquivo de configuracao..." -ForegroundColor Yellow

# Cria o diretório se não existir
if (-not (Test-Path $CLOUDFLARED_DIR)) {
    New-Item -ItemType Directory -Path $CLOUDFLARED_DIR -Force | Out-Null
}

# Encontra o arquivo de credenciais
$credentialFiles = Get-ChildItem -Path $CLOUDFLARED_DIR -Filter "*.json" | Sort-Object LastWriteTime -Descending
if ($credentialFiles.Count -eq 0) {
    Write-Host "[ERRO] Arquivo de credenciais nao encontrado em $CLOUDFLARED_DIR" -ForegroundColor Red
    Write-Host "Certifique-se de que o tunel foi criado com sucesso." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

$credentialFile = $credentialFiles[0].Name
Write-Host "[OK] Arquivo de credenciais encontrado: $credentialFile" -ForegroundColor Green

# Cria o arquivo de configuração
$credentialsPath = Join-Path $CLOUDFLARED_DIR $credentialFile
# Usa barras normais no YAML (funciona no Windows)
$credentialsPathYaml = $credentialsPath.Replace('\', '/')

$configLines = @(
    "tunnel: $TUNNEL_NAME",
    "credentials-file: $credentialsPathYaml",
    "",
    "ingress:",
    "  - service: http://localhost:3000"
)

# Salva o arquivo em UTF-8 sem BOM (Cloudflare prefere assim)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllLines($CONFIG_FILE, $configLines, $utf8NoBom)

Write-Host "[OK] Arquivo de configuracao criado: $CONFIG_FILE" -ForegroundColor Green

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "[OK] Configuracao concluida com sucesso!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar o tunel permanente, use:" -ForegroundColor Cyan
Write-Host "   .\iniciar-tunnel-permanente.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "Ou manualmente:" -ForegroundColor Cyan
Write-Host "   cloudflared tunnel run $TUNNEL_NAME" -ForegroundColor Yellow
Write-Host ""
Write-Host "[DICA] Lembre-se: O servidor Next.js deve estar rodando em http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
