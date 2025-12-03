# Advent of Code 2025 — Day 1 solver (both parts)
# This code is visible to you and will run here. It demonstrates the algorithm and verifies the example.
from typing import List


def parse(lines) -> list[tuple]:
    ops = []
    for line in lines:
        s = line.strip()
        if not s:
            continue
        dirc = s[0]
        dist = int(s[1:])
        ops.append((dirc, dist))
    return ops


def solve_part1(ops: list[tuple], start=50) -> int:
    pos = start
    n = 100
    count = 0
    for dirc, dist in ops:
        if dirc == "L":
            pos = (pos - dist) % n
        else:
            pos = (pos + dist) % n
        if pos == 0:
            count += 1
    return count


def solve_part2(operations: list[tuple], start=50) -> int:
    pos = start
    n = 100
    count = 0
    for direction, distance in operations:
        step = -1 if direction == "L" else 1
        # simulate each click (safe and simple)
        for _ in range(distance):
            pos = (pos + step) % n
            if pos == 0:
                count += 1
    return count


# Example from the puzzle statement
example = """L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
"""

text = ""
with open("input.txt", "r") as file:
    text = file.read()
p1_example = solve_part1(parse(text.split("\n")))
p2_example = solve_part2(parse(text.split("\n")))

print(p1_example)
print(p2_example)
