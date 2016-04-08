program main
    implicit none
    
    integer, parameter :: nwalker = 20
    integer, parameter :: nstep = 10000
    real, parameter :: delta = 0.5

    real, dimension(nwalker) :: x
    integer iwalker, istep
    real :: t0, t1, t2
    real :: acc
    real :: fave, fsqu, sigma
    real :: pstar, f

    call init_random_seed()
    call random_number(x)
    
    fave = 0.0
    fsqu = 0.0

    do istep = 1, nstep
        do iwalker = 1, nwalker
            call random_number(t0)
            t1 = x(iwalker) + delta * (t0 - 0.5)
            acc = min(pstar(t1) / pstar(x(iwalker)), 1.0)
            call random_number(t0)
            if (acc >= t0) then
                x(iwalker) = t1
            end if
            fave = fave + f(x(iwalker))
            fsqu = fsqu + f(x(iwalker))**2
        end do
    end do

    fave = fave / nwalker / nstep
    fsqu = fsqu / nwalker / nstep
    sigma = sqrt(fsqu - fave**2) / sqrt(nwalker * nstep - 1.0)
    write (*, '(a, I0)') 'nwalker = ', nwalker
    write (*, '(a, I0)') 'nstep = ', nstep
    write (*, '(a, F0.5)') 'fave = ', fave
    write (*, '(a, F0.5)') 'sigma = ', sigma
end

function pstar(x)
    implicit none
    real :: x, pstar
    pstar = exp(-(x - 5)**2)
end

function f(x)
    implicit none
    real :: f, x
    f = x
end

subroutine init_random_seed()
    integer :: i, n, clock
    integer, dimension(:), allocatable :: seed

    call random_seed(size = n)
    allocate(seed(n))
    call system_clock(count = clock)

    seed = clock + 37 * (/(i - 1, i = 1, n)/)
    call random_seed(put = seed)
    deallocate(seed)
end
