
# Demonstrate the problem with gls model

library(nlme)
data(Ovary)

gls_raw <- gls(follicles ~ sin(2*pi*Time) + cos(2*pi*Time), data = Ovary,
               correlation = corAR1(form = ~ 1 | Mare),
               weights = varPower())

Mares <- levels(gls_raw$groups)
V_raw <- lapply(Mares, function(g) getVarCov(gls_raw, individual = g))

Ovary_sorted <- Ovary[with(Ovary, order(Mare, Time)),]
gls_sorted <- update(gls_raw, data = Ovary_sorted)

V_sorted <- lapply(Mares, function(g) getVarCov(gls_sorted, individual = g))
all.equal(gls_raw$modelStruct, gls_sorted$modelStruct)
all.equal(V_raw, V_sorted)
nlme:::getVarCov.gls
identical(gls_raw$groups, gls_sorted$groups)
identical(varWeights(gls_raw$modelStruct$varStruct), 
          varWeights(gls_sorted$modelStruct$varStruct))

# proposed patch for getVarCov.gls

getVarCov_revised_gls <- function (obj, individual = 1, ...) {
    S <- corMatrix(obj$modelStruct$corStruct)[[individual]]
    if (!is.null(obj$modelStruct$varStruct)) {
        ind <- sort(obj$groups) == individual
        vw <- 1 / varWeights(obj$modelStruct$varStruct)[ind]
    }
    else vw <- rep(1, nrow(S))
    vars <- (obj$sigma * vw)^2
    result <- t(S * sqrt(vars)) * sqrt(vars)
    class(result) <- c("marginal", "VarCov")
    attr(result, "group.levels") <- names(obj$groups)
    result
}

V_raw <- lapply(Mares, function(g) getVarCov_revised_gls(gls_raw, individual = g))
V_sorted <- lapply(Mares, function(g) getVarCov_revised_gls(gls_sorted, individual = g))
all.equal(V_raw, V_sorted)

# proposed patch for getVarCov.lme

getVarCov_revised_lme <- function (obj, individuals, type = c("random.effects", "conditional", "marginal"), ...) {
    type <- match.arg(type)
    if (any("nlme" == class(obj))) 
        stop("not implemented for \"nlme\" objects")
    if (length(obj$group) > 1) 
        stop("not implemented for multiple levels of nesting")
    sigma <- obj$sigma
    D <- as.matrix(obj$modelStruct$reStruct[[1]]) * sigma^2
    if (type == "random.effects") {
        result <- D
    }
    else {
        result <- list()
        groups <- sort(obj$groups[[1]])
        ugroups <- unique(groups)
        if (missing(individuals)) 
            individuals <- as.matrix(ugroups)[1, ]
        if (is.numeric(individuals)) 
            individuals <- ugroups[individuals]
        for (individ in individuals) {
            indx <- which(individ == ugroups)
            if (!length(indx)) 
                stop(gettextf("individual %s was not used in the fit", 
                  sQuote(individ)), domain = NA)
            if (is.na(indx)) 
                stop(gettextf("individual %s was not used in the fit", 
                  sQuote(individ)), domain = NA)
            ind <- groups == individ
            if (!is.null(obj$modelStruct$corStruct)) {
                V <- corMatrix(obj$modelStruct$corStruct)[[as.character(individ)]]
            }
            else V <- diag(sum(ind))
            if (!is.null(obj$modelStruct$varStruct)) 
                sds <- 1/varWeights(obj$modelStruct$varStruct)[ind]
            else sds <- rep(1, sum(ind))
            sds <- obj$sigma * sds
            cond.var <- t(V * sds) * sds
            dimnames(cond.var) <- list(1:nrow(cond.var), 1:ncol(cond.var))
            if (type == "conditional") 
                result[[as.character(individ)]] <- cond.var
            else {
                Z <- model.matrix(obj$modelStruct$reStruc, getData(obj))[ind, 
                  , drop = FALSE]
                result[[as.character(individ)]] <- cond.var + 
                  Z %*% D %*% t(Z)
            }
        }
    }
    class(result) <- c(type, "VarCov")
    attr(result, "group.levels") <- names(obj$groups)
    result
}

lme_raw <- lme(follicles ~ sin(2*pi*Time) + cos(2*pi*Time), 
               random = ~ 1 | Mare,
               correlation = corExp(form = ~ Time),
               weights = varPower(),
               data=Ovary)

lme_sorted <- update(lme_raw, data = Ovary_sorted)

all.equal(lme_raw$modelStruct, lme_sorted$modelStruct)

# current getVarCov
V_raw <- lapply(Mares, function(g) getVarCov(lme_raw, individual = g, type = "marginal"))
V_sorted <- lapply(Mares, function(g) getVarCov(lme_sorted, individual = g, type = "marginal"))
all.equal(V_raw, V_sorted)

# revised getVarCov 
V_raw <- lapply(Mares, function(g) getVarCov_revised_lme(lme_raw, individual = g, type = "marginal"))
V_sorted <- lapply(Mares, function(g) getVarCov_revised_lme(lme_sorted, individual = g, type = "marginal"))
all.equal(V_raw, V_sorted)

sessionInfo()
knitr::purl("Bug-in-nlme-getVarCov.Rmd", documentation=0L)
