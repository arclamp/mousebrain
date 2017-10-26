import argparse
import csv
import random
import sys


def main():
    # Parse command line arguments.
    p = argparse.ArgumentParser(description='Generate CSV data and an epoch manifest for mousebrain')
    p.add_argument('-s', '--seed', metavar='SEED', type=int, default=0, help='Set the RNG seed')
    p.add_argument('-f', '--frames', metavar='FRAMES', type=int, default=100, help='Specify the number of frames to generate')
    p.add_argument('-c', '--cells', metavar='CELLS', type=int, default=5, help='Specify the number of cells to generate frames for')
    p.add_argument('-e', '--epochs', metavar='EPOCHS', type=int, default=3, help='Specify the number of epochs to mark within the frames')
    p.add_argument('-o', '--output', metavar='FILENAME', type=str, required=True, help='Specify the basename for the pair of generated data files')

    args = p.parse_args()

    # Seed the RNG.
    random.seed(args.seed)

    # Form the header line for the CSV.
    header = ['Frame'] + ['Cell %d' % (i) for i in xrange(args.cells)]

    # Generate random data.
    data = []
    for i in xrange(args.frames):
        data.append([i] + [random.uniform(-0.5, 0.5) for _ in xrange(args.cells)])

    # Place some random spikes in the data.
    for c in xrange(args.cells):
        # Compute how many spikes to place.
        spikes = int(random.normalvariate(10, 3))

        # Generate the locations of the spikes.
        locations = random.sample(xrange(args.frames), spikes)

        # Place the spikes.
        for loc in locations:
            mid = max(5, args.frames / 1000)
            width = int(random.normalvariate(mid, mid / 5))
            low, high = (max(loc - width, 0), min(loc + width, args.frames))
            height = random.uniform(0.5, 2.0)
            for j in xrange(low, high):
                data[j][c + 1] += height

    # Open a CSV data output file.
    with open('%s-data.csv' % (args.output), 'wb') as f:
        out = csv.writer(f)

        # Emit the header.
        out.writerow(header)

        # Emit the data.
        out.writerows(data)

    # Generate random epochs.
    def well_spaced(e):
        # Check that the spacing between all entries is at least 5000
        return all(e[i + 1] - e[i] >= 0.1 * args.frames for i in range(len(e) - 1))

    header = ['Epoch', 'Start', 'End']

    epochs = [0, 0]
    tries = 0
    while not well_spaced(epochs) and tries < 10000:
        factor = int(0.1 * args.frames)
        epochs = [0] + sorted(random.sample(xrange(factor, args.frames - factor), args.epochs - 1)) + [args.frames]
        tries += 1

    if tries == 1000:
        print >>sys.stderr, 'could not form properly spaced epochs'
        return 1

    # Open a CSV epoch output file.
    with open('%s-epoch.csv' % (args.output), 'wb') as f:
        out = csv.writer(f)

        # Emit the header.
        out.writerow(header)

        # Emit the data.
        out.writerows(([i, epochs[i], epochs[i + 1]] for i in range(len(epochs) - 1)))

    return 0


if __name__ == '__main__':
    sys.exit(main())
