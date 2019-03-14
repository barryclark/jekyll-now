
report_summary <- function(x = NULL, next_meeting = NULL){
  # apply
  if(is.character(next_meeting)){
    mdate <- lubridate::ymd(next_meeting)
    if(is.na(mdate)){
      stop("\n\nnext_meeting must be the format 'YYYY-m-d'.")
    }
  }
  if(!file.exists("./Data/meeting_days.csv")){
    err <- paste0("\n", crayon::red('do_summary()'),
                  " requires a 'meeting_days.csv' in the Data subfolder.\n",
                  "If meetings are always on a given day,\nuse ",
                  crayon::red('meeting_days()'), " to generate.")
    stop(err)
  } else {
    days <- read.csv("./Data/meeting_days.csv") %>%
      dplyr::mutate_all(lubridate::ymd) %>%
      tibble::as_tibble(.)
  }
  if(mdate %in% days$start){
    trange <- days[(which(days$start == mdate) - 1),]
  } else {
    stop("\n\n next_meeting not in 'meeting_days.csv'")
  }
  cat(cli::rule(center = " * SUMMARIZING DATA * ", col = "purple"),"\n")
  first_pass <- x %>%
    dplyr::filter(dplyr::between(as.Date(.$start), trange$start, trange$end)) %>%
    dplyr::mutate(dur = as.numeric(.$end - .$start)) %>%
    dplyr::mutate(prop_time = dur / sum(dur))
  cat(crayon::cyan( cli::symbol$bullet," Time spent on each project:   "))
  by_project <- first_pass %>%
    dplyr::group_by(project_name) %>%
    dplyr::summarise(prop_time = sum(prop_time)) %>%
    dplyr::arrange(dplyr::desc(prop_time)) %>%
    dplyr::left_join(., x, by = "project_name") %>%
    dplyr::select(project_name, client_category, prop_time) %>%
    dplyr::distinct()
  check_tibble(by_project)
  cat(crayon::cyan( cli::symbol$bullet," Time spent on each client:    "))
  by_client <- first_pass %>%
    dplyr::group_by(client_name) %>%
    dplyr::summarise(prop_time = sum(prop_time)) %>%
    dplyr::arrange(dplyr::desc(prop_time))%>%
    dplyr::left_join(., x, by = "client_name") %>%
    dplyr::select(client_name, client_category, prop_time) %>%
    dplyr::distinct()
  check_tibble(by_client)
  cat(crayon::cyan( cli::symbol$bullet," Weeks since research visited: "))
  weeks_since <- x %>% dplyr::group_by(project_name) %>%
    dplyr::filter( is_research) %>%
    dplyr::filter( start == max(start)) %>%
    dplyr::select( start, project_name) %>%
    dplyr::summarise(last_touch = difftime(Sys.Date(), as.Date(start),
                                           units = "weeks") %>%
                       ceiling) %>%
    dplyr::arrange(dplyr::desc(last_touch)) %>%
    dplyr::left_join(., x, by = "project_name") %>%
    dplyr::select(project_name, client_name, last_touch) %>%
    dplyr::distinct()
  check_tibble(weeks_since)

  # do
  return(list(project = by_project,
              client = by_client,
              weeks_since = weeks_since,
              time_range = trange))
}

plot_projects <- function(x, filename = "project_plot.tiff"){
  if(!all(colnames(x) %in% c("project_name", "client_name", "prop_time"))){
    err <- paste0("\nWrong table supplied to ",
                  crayon::red("plot_projects()","."))
    stop(err)
  }
  tiff(paste0("./images/",filename), height = 7, width = 7,
       units = "in", res = 400, compression = "lzw")
  par(mar =c(6,12,0.5,1))

  if(max(x$prop_time) < 0.5){
    xmax <- 0.5
  } else if(max(x$prop_time) > 0.5){
    xmax <- 0.8
  } else if(max(x$prop_time) > 0.75){
    xmax <- 1
  }
  suppressWarnings(plot(1~1, ylim = c(0.5, nrow(x)+0.5), xlim = c(0, xmax), bty = 'l',
                        xaxt="n", type="n", yaxt="n", xlab="",ylab=""))

  axis(side = 1, at = seq(0, xmax, 0.1),
       tck = -0.025,labels = NA)
  axis(side = 1, at = seq(0, xmax, 0.05),
       tck = -0.025/2,labels = NA)
  axis(side = 2, at = seq(1, nrow(x)),
       tck = -0.025, labels = NA)

  abline(h = 1:nrow(x), col = "gray90")
  abline(v=seq(0,xmax,0.1), col = "gray90")
  go_by <- ifelse(xmax == 1, 0.2, 0.1)
  mtext(text = seq(0, xmax, go_by), side = 1,
        at = seq(0, xmax, go_by), line = 0.6, cex = 1.2)

  cols <- plot_cols()[as.numeric(factor(x$client_category))]

  mtext(text = x$project_name, side = 2, las = 1,
        at = rev(seq(1, nrow(x))), line = .9, cex = 1.2)
  mtext(text = "Proportion of time spent\non projects", 1,
        at = xmax / 2, line = 4.20, cex = 1.75)

  rect(xleft = rep(-0.02, nrow(x)),
       xright = x$prop_time,
       ybottom = rev(seq(1,nrow(x))) -0.3,
       ytop = rev(seq(1,nrow(x))) +0.3,
       col = cols, lwd = 1.4)

  legend("bottomright", legend = c("C&S department", "External",
                                   "UWI", "UWIN"),bty = "n",
         fill = plot_cols(), cex = 1.3)

  invisible(dev.off())

}


plot_clients <- function(x, filename = "client_plot.tiff"){
  if(!all(colnames(x) %in% c("client_name","client_category", "prop_time"))){
    err <- paste0("\nWrong table supplied to ",
                  crayon::red("plot_clients()","."))
    stop(err)
  }
  tiff(paste0("./images/",filename), height = 7, width = 7,
       units = "in", res = 400, compression = "lzw")
  par(mar =c(6,12,0.5,1))

  if(max(x$prop_time) < 0.5){
    xmax <- 0.5
  } else if(max(x$prop_time) > 0.5){
    xmax <- 0.8
  } else if(max(x$prop_time) < 0.75){
    xmax <- 1
  }
  suppressWarnings(plot(1~1, ylim = c(0.5, nrow(x)+0.5), xlim = c(0, xmax), bty = 'l',
                        xaxt="n", type="n", yaxt="n", xlab="",ylab=""))

  axis(side = 1, at = seq(0, xmax, 0.1),
       tck = -0.025,labels = NA)
  axis(side = 1, at = seq(0, xmax, 0.05),
       tck = -0.025/2,labels = NA)
  axis(side = 2, at = seq(1, nrow(x)),
       tck = -0.025, labels = NA)

  abline(h = 1:nrow(x), col = "gray90")
  abline(v=seq(0,xmax,0.1), col = "gray90")
  go_by <- ifelse(xmax == 1, 0.2, 0.1)
  mtext(text = seq(0, xmax, go_by), side = 1,
        at = seq(0, xmax, go_by), line = 0.6, cex = 1.2)

  cols <- plot_cols()[as.numeric(factor(x$client_category))]

  mtext(text = x$client_name, side = 2, las = 1,
        at = rev(seq(1, nrow(x))), line = .9, cex = 1.2)
  mtext(text = "Proportion of time spent\nper client", 1,
        at = xmax / 2, line = 4.20, cex = 1.75)
  rect(xleft = rep(-0.02, dplyr::n_distinct(x$client_name)),
       xright = x$prop_time,
       ybottom = rev(seq(1,nrow(x))) -0.25,
       ytop = rev(seq(1,nrow(x))) +0.25,
       col = cols, lwd = 1.4)

  legend("bottomright", legend = c("C&S department", "External",
                                   "UWI", "UWIN"),bty = "n",
         fill = plot_cols(), cex = 1.5)

  invisible(dev.off())

}

plot_weeks <- function(x, filename = "weeks_since.tiff"){
  if(!all(colnames(x) %in% c("project_name","client_name", "last_touch"))){
    err <- paste0("\nWrong table supplied to ",
                  crayon::red("plot_weeks()","."))
    stop(err)
  }
  tiff(paste0("./images/",filename), height = 7, width = 7,
       units = "in", res = 400, compression = "lzw")
  par(mar =c(6,12,0.5,1))

  xmax <- as.numeric(ceiling(max(x$last_touch)/5)*5)
  if(xmax < 20){
    xse <- 3
  } else if(xmax > 20){
    xse <- 5
  } else if(xmax > 50){
    xse <- 10
  }
  suppressWarnings(plot(1~1, ylim = c(0.5, nrow(x)+0.5), xlim = c(0, xmax), bty = 'l',
                        xaxt="n", type="n", yaxt="n", xlab="",ylab=""))

  axis(side = 1, at = seq(0, xmax, xse),
       tck = -0.025,labels = NA)
  axis(side = 1, at = seq(0, xmax, xse/2),
       tck = -0.025/2,labels = NA)
  axis(side = 2, at = seq(1, nrow(x)),
       tck = -0.025, labels = NA)

  abline(h = 1:nrow(x), col = "gray90")
  abline(v=seq(0,xmax,xse), col = "gray90")
  mtext(text = seq(0, xmax, xse), side = 1,
        at = seq(0, xmax, xse), line = 0.6, cex = 1.2)


  col_vec <- rep(1, nrow(x))
  col_vec[which(x$client_name != "My own research")] <- 2
  cols <- c("#4a1486","#bcbddc")[col_vec]

  mtext(text = x$project_name, side = 2, las = 1,
        at = rev(seq(1, nrow(x))), line = .9, cex = 1.2)
  mtext(text = "Weeks since project\n visited", 1,
        at = xmax / 2, line = 4.20, cex = 1.75)
  rect(xleft = rep(-0.02, nrow(x)),
       xright = as.numeric(x$last_touch),
       ybottom = rev(seq(1,nrow(x))) -0.25,
       ytop = rev(seq(1,nrow(x))) +0.25,
       col = cols, lwd = 1.4)

  legend("bottomright", legend = c("My research", "Others"),
         bty = "n",fill = c("#4a1486","#bcbddc"), cex = 1.5)

  invisible(dev.off())
}

plot_all <- function(x = NULL){
  cat(cli::rule(center = " * GENERATING FIGURES * ", col = "purple"),"\n")
  cat(crayon::cyan( cli::symbol$bullet," Time spent per client:      "))
  plot_clients(x$client)
  cat(crayon::green( cli::symbol$tick), "\n")
  cat(crayon::cyan( cli::symbol$bullet," Time spent per project:     "))
  plot_projects(x$project)
  cat(crayon::green( cli::symbol$tick), "\n")
  cat(crayon::cyan( cli::symbol$bullet," Time since project visited: "))
  plot_weeks(x$weeks_since)
  cat(crayon::green( cli::symbol$tick), "\n")


}
