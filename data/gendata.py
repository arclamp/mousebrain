import argparse
import csv
import random
import sys


def main():
    # Parse command line arguments.
    p = argparse.ArgumentParser(description='Generate CSV data for mousebrain')
    p.add_argument('-s', '--seed', metavar='SEED', type=int, default=0, help='Set the RNG seed')
    p.add_argument('-f', '--frames', metavar='FRAMES', type=int, default=100, help='Specify the number of frames to generate')
    p.add_argument('-c', '--cells', metavar='CELLS', type=int, default=5, help='Specify the number of cells to generate frames for')
    p.add_argument('-e', '--epochs', metavar='EPOCHS', type=int, default=3, help='Specify the number of epochs to mark within the frames')

    args = p.parse_args()

    # Seed the RNG.
    random.seed(args.seed)

    # Form the header line for the CSV.
    header = ['Frame'] + ['Cell %d' % (i) for i in xrange(args.cells)]

    # Emit the header.
    out = csv.writer(sys.stdout)
    out.writerow(header)

    # Generate random data.
    data = []
    for i in xrange(args.frames):
        data.append([i] + [random.uniform(-0.5, 0.5) for _ in xrange(args.cells)])

    # Place some random spikes in the data.
    for c in xrange(args.cells):
        # Compute how many spikes to place.
        spikes = int(random.normalvariate(10, 3) * args.frames / 50000)

        # Generate the locations of the spikes.
        locations = random.sample(xrange(args.frames), spikes)

        # Place the spikes.
        for loc in locations:
            width = int(random.normalvariate(50, 10))
            low, high = (max(loc - width, 0), min(loc + width, args.frames))
            height = random.uniform(0.5, 2.0)
            for j in xrange(low, high):
                data[j][c + 1] += height

    # Emit the data.
    out.writerows(data)

    return 0


if __name__ == '__main__':
    sys.exit(main())
