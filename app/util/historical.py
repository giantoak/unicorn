MAX_HIST = 10


def active_history_terms(hist):
    terms = []
    for q in hist:
        if q['active']:
            terms.append(q['query'])

    return terms


def update_history(hist, query, active):
    for q in hist:
        if q['query'] == query:
            q['active'] = bool(int(active))

    return hist


def amend_history(hist, last):
    for q in hist:
        if last['query'] == q['query']:
            q['active'] = True
            return hist

    if len(hist) > MAX_HIST:
        del hist[0]

    hist.append(last)
    last['active'] = True
    return hist
