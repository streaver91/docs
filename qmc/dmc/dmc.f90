program main
    implicit none
    write (*, '(a)') 'Hello World'


end

subroutine dmc()
    implicit none

    integer, parameter :: dp = kind(0.d0)
    integer, parameter :: sp = kind(0.0)

    integer nstep
    integer nwalker
    integer nelec
    integer i, j, k, l, m, n
    integer istep 

    nstep = 10
    nwalker = 10
    
    do istep = 1, nstep
        m = nwalker
        do k = 1, m
            
        end do
    end do
end

