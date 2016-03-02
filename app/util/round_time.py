import datetime


def round_time(dt=None, round_to=60):
    if dt is None:
        dt = datetime.datetime.now()
    seconds = (dt - dt.min).seconds
    # // is a floor division, not a comment on following line:
    rounding = (seconds+round_to/2) // round_to * round_to
    return dt + datetime.timedelta(0, rounding-seconds, -dt.microsecond)


def round_month_up(origin_date):
    """
    Takes a datetime object and rounds up to the nearest month.
    E.g. 2/14/2013 becomes 3/1/2013
    """
    day = origin_date.day
    month = origin_date.month
    year = origin_date.year
    if origin_date.month == 12:
       delta = datetime.datetime(year + 1, 1, day) - origin_date
    else:
       delta = datetime.datetime(year, month + 1, day) - origin_date
    return origin_date + delta - datetime.timedelta(days=day - 1)


def round_month_down(origin_date):
    """
    Takes a datetime object and rounds down to the nearest month.
    E.g. 2/14/2013 becomes 2/1/2013
    """
    down_time = origin_date - datetime.timedelta(days=origin_date.day - 1)
    return down_time


def week_delta(start, stop):
    """
    Takes two datettime objects and returns number of weeks between them
    """
    delta = (stop - start) / 7
    return delta.days