import random
import timeit


def solution(grid, K):
    N = len(grid)
    if K == 1:
        grid = sorted([x for row in grid for x in row], reverse=True)
        return grid[0] + grid[1]

    # if K == N // 2 or K >= 235:
        # return brute_force(grid, K)

    # Calculate prefix sums
    prefix_sum = [[0] * (N + 1) for _ in range(N + 1)]
    for i in range(1, N + 1):
        for j in range(1, N + 1):
            prefix_sum[i][j] = (
                grid[i - 1][j - 1]
                + prefix_sum[i - 1][j]
                + prefix_sum[i][j - 1]
                - prefix_sum[i - 1][j - 1]
            )

    # Calculate sums for all KxK areas and store with coordinates
    area_sums = []
    for y in range(N - K + 1):
        for x in range(N - K + 1):
            sum_kxk = get_area_sum(x, y, prefix_sum, K)
            area_sums.append((sum_kxk, x, y))

    print("tiles", len(area_sums))

    # Sort the sums in descending order
    area_sums.sort(reverse=True, key=lambda x: x[0])

    # Find the two largest non-overlapping sums
    answer = 0

    last_j = len(area_sums)  # Initialize last_j to the length of area_sums

    for i in range(len(area_sums)):
        for j in range(i + 1, last_j):
            target = area_sums[i][0] + area_sums[j][0]
            if not is_overlapped(
                (area_sums[i][1], area_sums[i][2]),
                (area_sums[j][1], area_sums[j][2]),
                K,
            ):
                answer = max(answer, target)
                last_j = j
                break
            if target < answer:
                last_j = j
                break

    # 10, 6, 6, 4, 4, 4, 4, 3, 2, 1

    return answer


def brute_force(grid, K):
    N = len(grid)

    prefix_sum = [[0] * (N + 1) for _ in range(N + 1)]

    for i in range(1, N + 1):
        for j in range(1, N + 1):
            prefix_sum[i][j] = (
                grid[i - 1][j - 1]
                + prefix_sum[i - 1][j]
                + prefix_sum[i][j - 1]
                - prefix_sum[i - 1][j - 1]
            )

    # for i in range(N + 1):
    #     print(" ".join([f"{x:2}" for x in prefix_sum[i]]))

    answer = 0

    for y1 in range(N - K + 1):
        for x1 in range(N - K + 1):
            selected = get_area_sum(x1, y1, prefix_sum, K)
            # print("selected", x1, y1, selected)
            for y2 in range(y1 + K, N - K + 1):
                start = x1 + K if y2 == y1 else 0
                for x2 in range(start, N - K + 1):
                    if not is_overlapped((y1, x1), (y2, x2), K):
                        target = selected + get_area_sum(x2, y2, prefix_sum, K)
                        if target > answer:
                            answer = target

    return answer


def get_area_sum(x, y, prefix_sum, K):
    return (
        prefix_sum[x + K][y + K]
        - prefix_sum[x][y + K]
        - prefix_sum[x + K][y]
        + prefix_sum[x][y]
    )


def is_overlapped(area1, area2, K):
    if area1[1] + K <= area2[1] or area1[1] >= area2[1] + K:
        return False

    if area1[0] + K <= area2[0] or area1[0] >= area2[0] + K:
        return False

    return True


def generate_large_grid(size, max_value):
    """
    Generates a size x size grid with random values between 0 and max_value.
    """
    return [[random.randint(0, max_value) for _ in range(size)] for _ in range(size)]


# Example usage
grid_size = 500
max_value = 5000  # You can adjust the maximum value as needed
large_grid = generate_large_grid(grid_size, max_value)

# Now you can test the solution function with this large grid
K = 250  # Example value for K, you can adjust it as needed

# Test the function with your provided examples
# print out the time it takes to run the function

# print(timeit.timeit(lambda: print(solution(large_grid, K)), number=1))
print(timeit.timeit(lambda: print(solution(large_grid, K)), number=1))

print(
    timeit.timeit(
        lambda: print(
            solution(
                [
                    [2, 1, 1, 0, 1],
                    [1, 2, 0, 3, 0],
                    [0, 1, 5, 1, 2],
                    [0, 0, 1, 3, 1],
                    [1, 2, 0, 1, 1],
                ],
                2,
            ),
        ),
        number=1,
    )
)

# print(
#     timeit.timeit(
#         lambda: print(solution([[3, 4, 5], [2, 3, 4], [1, 2, 3]], 1)), number=1
#     )
# )
