local({

  ## Helper function to get the path to the library directory for a
  ## given packrat project.
  getPackratLibDir <- function(projDir = NULL) {
    path <- file.path("packrat", "lib", R.version$platform, getRversion())

    if (!is.null(projDir)) {

      ## Strip trailing slashes if necessary
      projDir <- sub("/+$", "", projDir)

      ## Only prepend path if different from current working dir
      if (!identical(normalizePath(projDir), normalizePath(getwd())))
        path <- file.path(projDir, path)
    }

    path
  }

  ## Ensure that we set the packrat library directory relative to the
  ## project directory. Normally, this should be the working directory,
  ## but we also use '.rs.getProjectDirectory()' if necessary (e.g. we're
  ## rebuilding a project while within a separate directory)
  libDir <- if (exists(".rs.getProjectDirectory"))
    getPackratLibDir(.rs.getProjectDirectory())
  else
    getPackratLibDir()

  ## Unload packrat in case it's loaded -- this ensures packrat _must_ be
  ## loaded from the private library. Note that `requireNamespace` will
  ## succeed if the package is already loaded, regardless of lib.loc!
  if ("packrat" %in% loadedNamespaces())
    try(unloadNamespace("packrat"), silent = TRUE)

  if (suppressWarnings(requireNamespace("packrat", quietly = TRUE, lib.loc = libDir))) {

    # Check 'print.banner.on.startup' -- when NA and RStudio, don't print
    print.banner <- packrat::get_opts("print.banner.on.startup")
    if (print.banner == "auto" && is.na(Sys.getenv("RSTUDIO", unset = NA))) {
      print.banner <- TRUE
    } else {
      print.banner <- FALSE
    }
    return(packrat::on(print.banner = print.banner))
  }

  ## Escape hatch to allow RStudio to handle bootstrapping. This
  ## enables RStudio to provide print output when automagically
  ## restoring a project from a bundle on load.
  if (!is.na(Sys.getenv("RSTUDIO", unset = NA)) &&
      is.na(Sys.getenv("RSTUDIO_PACKRAT_BOOTSTRAP", unset = NA))) {
    Sys.setenv("RSTUDIO_PACKRAT_BOOTSTRAP" = "1")
    setHook("rstudio.sessionInit", function(...) {
      # Ensure that, on sourcing 'packrat/init.R', we are
      # within the project root directory
      if (exists(".rs.getProjectDirectory")) {
        owd <- getwd()
        setwd(.rs.getProjectDirectory())
        on.exit(setwd(owd), add = TRUE)
      }
      source("packrat/init.R")
    })
    return(invisible(NULL))
  }

  ## Bootstrapping -- only performed in interactive contexts,
  ## or when explicitly asked for on the command line
  if (interactive() || "--bootstrap-packrat" %in% commandArgs(TRUE)) {

    needsRestore <- "--bootstrap-packrat" %in% commandArgs(TRUE)

    message("Packrat is not installed in the local library -- ",
            "attempting to bootstrap an installation...")

    ## We need utils for the following to succeed -- there are calls to functions
    ## in 'restore' that are contained within utils. utils gets loaded at the
    ## end of start-up anyhow, so this should be fine
    library("utils", character.only = TRUE)

    ## Install packrat into local project library
    packratSrcPath <- list.files(full.names = TRUE,
                                 file.path("packrat", "src", "packrat")
    )

    ## No packrat tarballs available locally -- try some other means of installation
    if (!length(packratSrcPath)) {

      message("> No source tarball of packrat available locally")

      ## There are no packrat sources available -- try using a version of
      ## packrat installed in the user library to bootstrap
      if (requireNamespace("packrat", quietly = TRUE) && packageVersion("packrat") >= "0.2.0.99") {
        message("> Using user-library packrat (",
                packageVersion("packrat"),
                ") to bootstrap this project")
      }

      ## Couldn't find a user-local packrat -- try finding and using devtools
      ## to install
      else if (requireNamespace("devtools", quietly = TRUE)) {
        message("> Attempting to use devtools::install_github to install ",
                "a temporary version of packrat")
        library(stats) ## for setNames
        devtools::install_github("rstudio/packrat")
      }

      ## Try downloading packrat from CRAN if available
      else if ("packrat" %in% rownames(available.packages())) {
        message("> Installing packrat from CRAN")
        install.packages("packrat")
      }

      ## Fail -- couldn't find an appropriate means of installing packrat
      else {
        stop("Could not automatically bootstrap packrat -- try running ",
             "\"'install.packages('devtools'); devtools::install_github('rstudio/packrat')\"",
             "and restarting R to bootstrap packrat.")
      }

      # Restore the project, unload the temporary packrat, and load the private packrat
      if (needsRestore)
        packrat::restore(prompt = FALSE, restart = TRUE)

      ## This code path only reached if we didn't restart earlier
      unloadNamespace("packrat")
      requireNamespace("packrat", lib.loc = libDir, quietly = TRUE)
      return(packrat::on())

    }

    ## Multiple packrat tarballs available locally -- try to choose one
    ## TODO: read lock file and infer most appropriate from there; low priority because
    ## after bootstrapping packrat a restore should do the right thing
    if (length(packratSrcPath) > 1) {
      warning("Multiple versions of packrat available in the source directory;",
              "using packrat source:\n- ", shQuote(packratSrcPath))
      packratSrcPath <- packratSrcPath[[1]]
    }


    lib <- file.path("packrat", "lib", R.version$platform, getRversion())
    if (!file.exists(lib)) {
      dir.create(lib, recursive = TRUE)
    }

    message("> Installing packrat into project private library:")
    message("- ", shQuote(lib))

    surround <- function(x, with) {
      if (!length(x)) return(character())
      paste0(with, x, with)
    }


    ## Invoke install.packages() in clean R session
    peq <- function(x, y) paste(x, y, sep = " = ")
    installArgs <- c(
      peq("pkgs", surround(packratSrcPath, with = "'")),
      peq("lib", surround(lib, with = "'")),
      peq("repos", "NULL"),
      peq("type", surround("source", with = "'"))
    )

    fmt <- "utils::install.packages(%s)"
    installCmd <- sprintf(fmt, paste(installArgs, collapse = ", "))

    ## Write script to file (avoid issues with command line quoting
    ## on R 3.4.3)
    installFile <- tempfile("packrat-bootstrap", fileext = ".R")
    writeLines(installCmd, con = installFile)
    on.exit(unlink(installFile), add = TRUE)

    fullCmd <- paste(
      surround(file.path(R.home("bin"), "R"), with = "\""),
      "--vanilla",
      "--slave",
      "-f",
      surround(installFile, with = "\"")
    )
    system(fullCmd)

    ## Tag the installed packrat so we know it's managed by packrat
    ## TODO: should this be taking information from the lockfile? this is a bit awkward
    ## because we're taking an un-annotated packrat source tarball and simply assuming it's now
    ## an 'installed from source' version

    ## -- InstallAgent -- ##
    installAgent <- "InstallAgent: packrat 0.5.0"

    ## -- InstallSource -- ##
    installSource <- "InstallSource: source"

    packratDescPath <- file.path(lib, "packrat", "DESCRIPTION")
    DESCRIPTION <- readLines(packratDescPath)
    DESCRIPTION <- c(DESCRIPTION, installAgent, installSource)
    cat(DESCRIPTION, file = packratDescPath, sep = "\n")

    # Otherwise, continue on as normal
    message("> Attaching packrat")
    library("packrat", character.only = TRUE, lib.loc = lib)

    message("> Restoring library")
    if (needsRestore)
      packrat::restore(prompt = FALSE, restart = FALSE)

    # If the environment allows us to restart, do so with a call to restore
    restart <- getOption("restart")
    if (!is.null(restart)) {
      message("> Packrat bootstrap successfully completed. ",
              "Restarting R and entering packrat mode...")
      return(restart())
    }

    # Callers (source-erers) can define this hidden variable to make sure we don't enter packrat mode
    # Primarily useful for testing
    if (!exists(".__DONT_ENTER_PACKRAT_MODE__.") && interactive()) {
      message("> Packrat bootstrap successfully completed. Entering packrat mode...")
      packrat::on()
    }

    Sys.unsetenv("RSTUDIO_PACKRAT_BOOTSTRAP")

  }

})
