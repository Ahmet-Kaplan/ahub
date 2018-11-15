

#' Title
#'
#' @param myfun
#' @param process_name
#' @param arglist
#' @param debug
#'
#' @return
#' @export
#'
#' @import glue
#'
#' @examples
thread_process <- function(myfun,
                           process_name = "thread",
                           arglist,
                           debug = F) {
    # init logging
    if(debug) switch_debug()
    pid <- get_pid(process_name) # get the last process id for this process
    pid_info <- get_pid_info(pid) # get the info to the pid

    # icheck if process is running or finished, if yes create new pid
    if(pid_info$status != 'init') pid <- create_pid(process_name)


    pid_log(pid, glue('Process {process_name} started.'))
    set_pid_status(pid, 'running')

    # do some stuff ##################
    do.call(myfun, arglist)
    #################################

    set_pid_status(pid, 'finished')

    # wrap up
    pid_log(pid, glue('Process {process_name} finished'))


    output <- list(msg=glue("Process {process_name} finished!"),
                   log=get_pid_log(pid),
                   status = 'finished',
                   pid = pid)
    output
}
