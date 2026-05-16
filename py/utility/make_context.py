# Sumo SDK utility: make_context

from core.context import SumoContext


def make_context_util(ctxmap, basectx):
    return SumoContext(ctxmap, basectx)
