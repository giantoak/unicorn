from datetime import datetime
from datetime import timedelta


def round_time(dt=None, round_to=60):
    """

    :param datetime.datetime dt:
    :param int round_to:
    :return datetimte.datetime:
    """
    if dt is None:
        dt = datetime.now()
    seconds = (dt - dt.min).seconds
    # // is a floor division, not a comment on following line:
    rounding = (seconds+round_to/2) // round_to * round_to
    return dt + timedelta(0, rounding-seconds, -dt.microsecond)


def round_month_up(origin_date):
    """
    Takes a datetime object and rounds up to the nearest month.
    E.g. 2/14/2013 becomes 3/1/2013
    :param datetime.datetime origin_date:
    :return datetime.datetime:
    """
    day = origin_date.day
    month = origin_date.month
    year = origin_date.year
    if origin_date.month == 12:
       delta = datetime(year + 1, 1, day) - origin_date
    else:
       delta = datetime(year, month + 1, day) - origin_date
    return origin_date + delta - datetime.timedelta(days=day - 1)


def round_month_down(origin_date):
    """
    Takes a datetime object and rounds down to the nearest month.
    E.g. 2/14/2013 becomes 2/1/2013
    :param datetime.datetime origin_date:
    :return datetime.datetime:
    """
    down_time = origin_date - timedelta(days=origin_date.day - 1)
    return down_time


def week_delta(start, stop):
    """
    Takes two datetime objects and returns number of weeks between them
    :param datetime.datetime start:
    :param datetime.datetime stop:
    :return int:
    """
    delta = (stop - start) / 7
    return delta.days