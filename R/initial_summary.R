

  get_all() %>%
  check_all() %>%
  join_data() %>%
  report_summary(., "2019-3-18") %>%
  plot_all() %>%
  make_post()


plot_projects(data$project)
plot_clients(data$client)
plot_weeks(data$weeks_since)


do_everything <-
