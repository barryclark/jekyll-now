# Desarrollo local y sincronización

Guía para trabajar en este portafolio (`maniac787.github.io`), forkeado de [barryclark/jekyll-now](https://github.com/barryclark/jekyll-now).

## Remotos Git


| Remoto     | URL                                                | Uso                          |
| ---------- | -------------------------------------------------- | ---------------------------- |
| `origin`   | `git@github.com:maniac787/maniac787.github.io.git` | Tu fork (push / pull diario) |
| `upstream` | `https://github.com/barryclark/jekyll-now.git`     | Repo original (solo fetch)   |


Si aún no tienes `upstream`:

```bash
git remote add upstream https://github.com/barryclark/jekyll-now.git
git remote -v
```

---

## Probar en local

### 1. Requisitos

- Git
- Ruby 3.x (recomendado) y Bundler  
En Ubuntu/Debian:

```bash
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev
gem install bundler --user-install
```

Si al instalar bundler ves el aviso de PATH, añádelo a tu shell (una sola vez):

```bash
echo 'export PATH="$HOME/.local/share/gem/ruby/3.3.0/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Comprueba:

```bash
which bundle
bundle -v
```

Si `bundle` sigue sin encontrarse en la sesión actual, usa la ruta completa o exporta el PATH en esa terminal:

```bash
export PATH="$HOME/.local/share/gem/ruby/3.3.0/bin:$PATH"
```

### 2. Dependencias del proyecto

En la raíz del repo:

```bash
# Si no existe Gemfile, créalo con:
cat > Gemfile <<'EOF'
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
EOF

# Instalar gemas DENTRO del proyecto (evita errores de permisos en /var/lib/gems)
bundle config set --local path 'vendor/bundle'
bundle install
```

Si ves `Bundler::PermissionError ... /var/lib/gems/...`, es porque Bundle intentó escribir en el sistema. Usa el `bundle config set --local path 'vendor/bundle'` de arriba y vuelve a ejecutar `bundle install`.

En `_config.yml` debe estar `vendor` dentro de `exclude`, para que Jekyll no intente procesar las gemas instaladas localmente.

`github-pages` usa las mismas gemas/plugins que GitHub Pages.

### 3. Arrancar el sitio

```bash
bundle exec jekyll serve --livereload
```

Abre: [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

Opciones útiles:

```bash
# Puerto distinto
bundle exec jekyll serve --port 4001

# Forzar rebuild completo
bundle exec jekyll serve --livereload --force_polling
```

Para detener el servidor: `Ctrl+C`.

### 4. Probar el formulario de contacto

1. Con el servidor en marcha, ve a la sección **Contacto** (`#contact`).
2. Completa nombre, correo, asunto y mensaje.
3. Resuelve la verificación anti-spam (suma, p. ej. `3 + 5`).
4. Espera al menos ~3 segundos desde que cargó la página (filtro anti-bots).
5. Pulsa **Enviar mensaje**.
6. Debe aparecer el aviso de éxito en la página.

La protección incluye: captcha matemático, honeypot oculto y tiempo mínimo de relleno.

**Primera vez con FormSubmit**

- El servicio envía un correo de activación a `maniac787@gmail.com`.
- Ábrelo y confirma el formulario.
- Vuelve a enviar un mensaje de prueba; a partir de ahí llegan normalmente.

Notas:

- FormSubmit acepta envíos desde `localhost`.
- Si ves error, revisa la consola del navegador (F12 → Network) y la carpeta de spam del Gmail.
- Tras confirmar, los mensajes llegan a `maniac787@gmail.com` con asunto *Nuevo mensaje desde el portafolio*.

### 5. Flujo típico de cambios

```bash
# Edita archivos (_layouts/default.html, js/main.js, etc.)
# Recarga el navegador (con --livereload suele actualizarse solo)

git status
git add .
git commit -m "feat: describe el cambio"
git push origin master
```

GitHub Pages reconstruye el sitio en unos minutos:  
[https://maniac787.github.io](https://maniac787.github.io)

---

## Sincronizar con el fork original (`upstream`)

Usa esto cuando quieras traer cambios del tema base `jekyll-now` a tu fork.

### 1. Traer lo último del original

```bash
git fetch upstream
```

### 2. Comprobar si te falta algo

```bash
git checkout master
git status -sb

# Commits tuyos (izq) vs commits del original que te faltan (der)
git rev-list --left-right --count HEAD...upstream/master
```

Interpretación:


| Resultado | Significado                                          |
| --------- | ---------------------------------------------------- |
| `N 0`     | Estás al día con upstream; solo tienes commits tuyos |
| `N M`     | Te faltan `M` commits del original                   |
| `0 0`     | Mismo historial (poco habitual en este repo)         |


Ver qué cambió en el original:

```bash
git log --oneline HEAD..upstream/master
git diff HEAD...upstream/master
```

### 3. Integrar cambios del original

**Opción A — merge (más segura):**

```bash
git merge upstream/master
# resuelve conflictos si aparecen
git push origin master
```

**Opción B — rebase (historial más lineal):**

```bash
git rebase upstream/master
# resuelve conflictos si aparecen
git push origin master
```

> Cuidado: este portafolio tiene muchos cambios propios respecto a `jekyll-now`.  
> Antes de merge/rebase, revisa el diff. A menudo **no hace falta** sincronizar el tema base si solo mantienes tu CV.

### 4. Verificar que tu fork está al día contigo mismo

Para estar seguro de que tienes lo último de **tu** repo en GitHub:

```bash
git fetch origin
git status -sb
# Ideal: ## master...origin/master  (sin ahead/behind)
```

Si estás detrás:

```bash
git pull origin master
```

---

## Idioma (i18n)

- Por defecto: **inglés (EN)**
- Secundario: **español (ES)**
- Selector en el menú lateral: `EN` / `ES`
- La preferencia se guarda en `localStorage` (`site-lang`)
- Traducciones: `js/i18n.js`

## Resumen rápido

```bash
# --- Local ---
bundle config set --local path 'vendor/bundle'
bundle install
bundle exec jekyll serve --livereload
# → http://127.0.0.1:4000/  → sección Contacto → enviar prueba

# --- Tu fork ---
git fetch origin && git status -sb

# --- Original jekyll-now ---
git fetch upstream
git rev-list --left-right --count HEAD...upstream/master
# si el segundo número > 0:
git merge upstream/master
git push origin master
```

