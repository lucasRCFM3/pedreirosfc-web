# 📝 Como Usar os Scripts PowerShell

## ⚠️ Importante: Como Abrir os Scripts

**NÃO** clique duas vezes nos arquivos `.ps1`! Isso pode fazer a janela fechar rapidamente.

### ✅ Forma Correta (Recomendada):

1. **Abra o PowerShell** na pasta `web`
2. **Rode o script** usando `.\` antes do nome:

```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
.\criar-tunnel-permanente.ps1
```

### ✅ Alternativa (Clique Duplo):

Se você clicar duas vezes, a janela pode fechar rápido. Para ver o que está acontecendo:

1. Clique com o botão direito no arquivo `.ps1`
2. Escolha "Abrir com PowerShell"
3. Ou selecione "Executar com PowerShell"

---

## 🔧 Se a Janela Ainda Fechar Muito Rápido

### Opção 1: Executar no Terminal Aberto

1. Abra o PowerShell normalmente
2. Navegue até a pasta:
   ```powershell
   cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
   ```
3. Execute o script:
   ```powershell
   .\criar-tunnel-permanente.ps1
   ```

### Opção 2: Ver os Erros

Se o script encontrar um erro e fechar, você pode ver o que aconteceu:

1. Abra o PowerShell
2. Rode o script manualmente:
   ```powershell
   cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
   .\criar-tunnel-permanente.ps1
   ```
3. O erro vai aparecer no terminal e não vai fechar automaticamente

---

## 🚀 Scripts Disponíveis

### 1. `criar-tunnel-permanente.ps1`

**O que faz:** Configura o túnel permanente pela primeira vez

**Como usar:**
```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
.\criar-tunnel-permanente.ps1
```

**O que vai acontecer:**
- Verifica se o Cloudflare Tunnel está instalado
- Abre navegador para login
- Cria o túnel permanente
- Configura tudo automaticamente

---

### 2. `iniciar-tunnel-permanente.ps1`

**O que faz:** Inicia o túnel permanente (use após configurar)

**Como usar:**
```powershell
cd "C:\Users\rcfm\Documents\pedreirosfc web\web"
.\iniciar-tunnel-permanente.ps1
```

**O que vai acontecer:**
- Conecta ao túnel permanente
- Mostra a URL para compartilhar
- Fica rodando até você pressionar Ctrl+C

---

## ❓ Problemas Comuns

### "Script não pode ser executado"

Se aparecer um erro sobre execução de scripts:

1. Abra o PowerShell como Administrador
2. Rode:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Digite `S` quando perguntar

### Janela fecha imediatamente

- Use o PowerShell normalmente (não clique duplo)
- Ou clique direito → "Abrir com PowerShell"

### "Cloudflare Tunnel não encontrado"

- Instale com: `winget install --id Cloudflare.cloudflared`
- Ou use o caminho completo (veja o erro no script)

---

## 💡 Dica

**Sempre** abra o PowerShell primeiro e navegue até a pasta antes de executar os scripts. Isso evita problemas! 🚀

